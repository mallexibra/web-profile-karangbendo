import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';
const shopSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    identity: yup.mixed<File>().required('Identity is required and must be a file'),
    userId: yup.number().required('User ID is required and must be a number').integer(),
    location: yup.string().required('Location is required and must be a string'),
    phone: yup.string().required('Phone is required and must be a string'),
});

export const GET = async () => {
    try {
        const shops = await db.shop.findMany({ include: { product: true } });
        return NextResponse.json({
            data: shops,
            message: "Fetched all shops successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch shops',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        const data: any = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            identity: formData.get('identity') as File,
            location: formData.get('location') as string,
            phone: formData.get('phone') as string,
            userId: formData.get('userId') as unknown as number,
        };

        await shopSchema.validate(data, { abortEarly: false });

        const image = data.identity;
        if (!image) {
            throw new Error('Identity file is missing');
        }

        const timestamp = Date.now();
        const imgShop = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}`;

        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'shops_identity', public_id: imgShop },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url);
                }
            );
            stream.end(buffer);
        });

        const newShop = await db.shop.create({
            data: {
                ...data,
                userId: Number(data.userId),
                identity: uploadResponse as string,
            },
        });

        return NextResponse.json({
            data: newShop,
            message: "Shop created successfully",
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
            error: 'Failed to create shop',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
