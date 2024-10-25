import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';
const villageApparatusSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    position: yup.string().required('Position is required and must be a string'),
    profile: yup.mixed<File>().required('File is required'),
});

export const GET = async () => {
    try {
        const villageApparatus = await db.villageApparatus.findMany();
        return NextResponse.json({
            data: villageApparatus,
            message: "Fetched all village apparatus successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch village apparatus',
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
            position: formData.get('position') as string,
        };
        const image = formData.get('profile') as File;

        await villageApparatusSchema.validate({ ...data, profile: image }, { abortEarly: false });

        const timestamp = Date.now();
        const imgProfile = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}`;
        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'village_apparatus', public_id: imgProfile },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url);
                }
            );
            stream.end(buffer);
        });

        const imagePath = uploadResponse as string;
        const newApparatus = await db.villageApparatus.create({
            data: {
                ...data,
                profile: imagePath,
            },
        });

        return NextResponse.json({
            data: newApparatus,
            message: "Village apparatus created successfully",
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
            error: 'Failed to create village apparatus',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
