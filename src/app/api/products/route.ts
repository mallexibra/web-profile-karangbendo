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

export const GET = async () => {
    try {
        const products = await db.product.findMany({ include: { shop: true } });
        return NextResponse.json({
            data: products,
            message: "Fetched all products successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch products',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        const data: any = {
            image: formData.get('image') as File,
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            price: parseInt(formData.get('price') as string, 10),
            shopId: parseInt(formData.get('shopId') as string, 10),
        };
        const image = data.image;

        await productSchema.validate(data, { abortEarly: false });

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

        const newProduct = await db.product.create({
            data: {
                ...data,
                image: uploadResponse as string,
            },
        });

        return NextResponse.json({
            data: newProduct,
            message: "Product created successfully",
            status: true,
        }, { status: 201 });

    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return NextResponse.json({
                error: 'validation',
                message: error.errors,
                status: false,
            }, { status: 400 });
        }

        return NextResponse.json({
            error: 'Failed to create product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
