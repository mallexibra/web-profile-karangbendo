import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';

const productSchema = yup.object({
    image: yup.mixed<File>().required('Image is required'),
    name: yup.string().required('Name is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    price: yup.number().required('Price is required and must be a number').positive('Price must be a positive number').integer('Price must be an integer'),
    shopId: yup.number().required('Shop ID is required and must be a number').integer('Shop ID must be an integer'),
});

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const product = await db.product.findUnique({
            where: { id: Number(params.id) },
            include: {
                shop: {
                    include: {
                        owner: true,
                    },
                }
            }
        });
        return NextResponse.json({
            data: product,
            message: "Fetched data product successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('image') as File | null;

        await productSchema.validate(data, { abortEarly: false });

        const existingProduct = await db.product.findUnique({ where: { id: Number(params.id) }, include: { shop: true } });
        if (!existingProduct) {
            return NextResponse.json({
                error: 'Product not found',
                message: 'Product not found',
                status: false,
            }, { status: 404 });
        }

        let imageUrl = existingProduct.image;

        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            if (existingProduct.image) {
                const publicId = existingProduct.image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            const timestamp = Date.now();
            const imgProduct = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}`;
            const buffer = Buffer.from(await image.arrayBuffer());

            const uploadResponse = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'products', public_id: imgProduct },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                );
                stream.end(buffer);
            });

            imageUrl = uploadResponse as string;
        }

        const updateProduct = await db.product.update({
            where: { id: Number(params.id) },
            data: { ...data, id: Number(data.id), shopId: Number(data.shopId), price: Number(data.price), image: imageUrl },
        });

        return NextResponse.json({
            data: updateProduct,
            message: "Product updated successfully",
            status: true,
        });

    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return NextResponse.json({
                error: 'validation',
                message: error.errors,
                status: false,
            }, { status: 400 });
        }

        return NextResponse.json({
            error: 'Failed to update product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const product = await db.product.findUnique({ where: { id: Number(params.id) } });
        if (!product) {
            return NextResponse.json({
                error: 'Product not found',
                message: 'Product not found',
                status: false,
            }, { status: 404 });
        }

        if (product.image) {
            const publicId = product.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await db.product.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Product deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
