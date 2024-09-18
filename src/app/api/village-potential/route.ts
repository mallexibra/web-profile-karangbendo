import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const villagePotentialSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    image: yup.mixed<File>().required('Image is required'),
});

export const GET = async () => {
    try {
        const villagePotential = await db.villagePotential.findMany();
        return NextResponse.json({
            data: villagePotential,
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

        const villagePotential = `${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const imagePath = villagePotential;
        const path = join('./public/assets/village-potential', villagePotential);
        await writeFile(path, buffer);

        const newProfile = await db.villagePotential.create({
            data: {
                ...data,
                image: imagePath,
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
