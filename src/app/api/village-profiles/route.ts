import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';

const villageProfileSchema = yup.object({
    visi: yup.string().required('Visi is required and must be a string'),
    misi: yup.string().required('Misi is required and must be a string'),
    resident: yup.number().required('Resident is required and must be a number').integer(),
    children: yup.number().required('Children is required and must be a number').integer(),
    mature: yup.number().required('Mature is required and must be a number').integer(),
    old: yup.number().required('Old is required and must be a number').integer(),
    image: yup.mixed<File>().required('Image is required'),
});

export const GET = async () => {
    try {
        const villages = await db.villageProfile.findMany();
        return NextResponse.json({
            data: villages,
            message: "Fetched all villages successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch villages',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        const data: any = {
            visi: formData.get('visi') as string,
            misi: formData.get('misi') as string,
            resident: Number(formData.get('resident')),
            children: Number(formData.get('children')),
            mature: Number(formData.get('mature')),
            old: Number(formData.get('old')),
        };
        const image = formData.get('image') as File;

        await villageProfileSchema.validate({ ...data, image }, { abortEarly: false });

        const timestamp = Date.now();
        const imgProfile = `${timestamp}_${MD5(image.name.split('.')[0]).toString()}`;
        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadedImage = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'village_profile', public_id: imgProfile },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url);
                }
            );
            stream.end(buffer);
        });

        const newProfile = await db.villageProfile.create({
            data: {
                ...data,
                image: uploadedImage as string,
            },
        });

        return NextResponse.json({
            data: newProfile,
            message: "Village profile created successfully",
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
            error: 'Failed to create village profile',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
