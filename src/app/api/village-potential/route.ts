import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';
const villagePotentialSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    image: yup.mixed<File>().required('Image is required'),
});

export const GET = async () => {
    try {
        const villagePotentials = await db.villagePotential.findMany();
        return NextResponse.json({
            data: villagePotentials,
            message: "Fetched all village potential successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch village potential',
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
        };
        const image = formData.get('image') as File;

        await villagePotentialSchema.validate({ ...data, image }, { abortEarly: false });

        const timestamp = Date.now();
        const imgPotential = `${timestamp}_${MD5(image.name.split('.')[0]).toString()}`;
        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadedImage = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'village_potential', public_id: imgPotential },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url);
                }
            );
            stream.end(buffer);
        });

        const newProfile = await db.villagePotential.create({
            data: {
                ...data,
                image: uploadedImage as string,
            },
        });

        return NextResponse.json({
            data: newProfile,
            message: "Village potential created successfully",
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
            error: 'Failed to create village potential',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
