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

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('image') as File | null;

        await productSchema.validate(data, { abortEarly: false });

        const existingProduct = await db.product.findUnique({ where: { id: Number(params.id) } });
        if (!existingProduct) {
            return NextResponse.json({
                error: 'Product not found',
                message: 'Product not found',
                status: false,
            }, { status: 404 });
        }

        let imagePath = existingProduct.image;
        if (image) {
            if (existingProduct.image) {
                await unlink(join('./assets/products', existingProduct.image));
            }
            const imgProduct = `${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imagePath = imgProduct;
            const path = join('./assets/products', imgProduct);
            await writeFile(path, buffer);
        }

        const updateProduct = await db.product.update({
            where: { id: Number(params.id) },
            data: { ...data, image: imagePath },
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

export const DELETE = async ({ params }: { params: { id: string } }) => {
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
            await unlink(join('./assets/products', product.image));
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
