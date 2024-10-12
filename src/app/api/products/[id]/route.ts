import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const productSchema = yup.object({
    image: yup.mixed<File>().required('Image is required'),
    name: yup.string().required('Name is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    price: yup.number().required('Price is required and must be a number').positive('Price must be a positive number').integer('Price must be an integer'),
    shopId: yup.number().required('Shop ID is required and must be a number').integer('Shop ID must be an integer'),
});

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const products = await db.product.findUnique({
            where: { id: Number(params.id) }, include: {
                shop: {
                    include: {
                        owner: true,
                    },
                }
            }
        });
        return NextResponse.json({
            data: products,
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

        let imagePath = existingProduct.image;
        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            if (existingProduct.image) {
                await unlink(join('./public/assets/products', existingProduct.image));
            }
            const timestamp = Date.now();
            const imgProduct = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imagePath = imgProduct;
            const path = join('./public/assets/products', imgProduct);
            await writeFile(path, buffer);
        }

        const updateProduct = await db.product.update({
            where: { id: Number(params.id) },
            data: { ...data, id: Number(data.id), shopId: Number(data.shopId), price: Number(data.price), image: imagePath },
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
            await unlink(join('./public/assets/products', product.image));
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
