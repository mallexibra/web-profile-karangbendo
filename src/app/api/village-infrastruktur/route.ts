import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const villageInfrastrukturSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    image: yup.mixed<File>().required('Image is required'),
});

export const GET = async () => {
    try {
        const villageInfrastruktur = await db.villageInfrastruktur.findMany();
        return NextResponse.json({
            data: villageInfrastruktur,
            message: "Fetched all village infrastruktur successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch village infrastruktur',
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

        await villageInfrastrukturSchema.validate({ ...data, image }, { abortEarly: false });

        const timestamp = Date.now();
        const imgInfrastruktur = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const imagePath = imgInfrastruktur;
        const path = join('./public/assets/village-infrastruktur', imgInfrastruktur);
        await writeFile(path, buffer);

        const newProfile = await db.villageInfrastruktur.create({
            data: {
                ...data,
                image: imagePath,
            },
        });

        return NextResponse.json({
            data: newProfile,
            message: "Village infrastruktur created successfully",
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
            error: 'Failed to create village infrastruktur',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
