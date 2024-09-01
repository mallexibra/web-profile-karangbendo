import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';
import { MD5 } from 'crypto-js';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const legalProductSchema = yup.object({
    title: yup.string().required('Title is required and must be a string'),
    number: yup.string().required('Number is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    type: yup.mixed<'village_regulation' | 'village_head_regulation' | 'village_head_decision'>()
        .oneOf(['village_regulation', 'village_head_regulation', 'village_head_decision'], 'Invalid type of legal product')
        .required('Type is required')
});

export const GET = async () => {
    try {
        const legalProduct = await db.legalProduct.findMany();
        return NextResponse.json({
            data: legalProduct,
            message: "Fetched all legal product successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch legal product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        const data: any = {
            title: formData.get('title') as string,
            number: formData.get('number') as string,
            description: formData.get('description') as string,
            type: formData.get('type') as string,
        };
        const file = formData.get('file') as File | null;

        await legalProductSchema.validate(data, { abortEarly: false });

        let filePath;
        if (file != null) {
            const imgProfile = `${MD5(file.name.split(".")[0]).toString()}.${file.name.split(".")[1]}`;
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            filePath = imgProfile;
            const path = join('./public/assets/legal', imgProfile);
            await writeFile(path, buffer);
        }

        const newLegalProduct = await db.legalProduct.create({
            data: {
                ...data,
                file: filePath,
            },
        });

        return NextResponse.json({
            data: newLegalProduct,
            message: "Legal product created successfully",
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
            error: 'Failed to create legal product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};