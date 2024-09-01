import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const legalProductSchema = yup.object({
    title: yup.string().required('Title is required and must be a string'),
    number: yup.string().required('Number is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    type: yup.mixed<'village_regulation' | 'village_head_regulation' | 'village_head_decision'>()
        .oneOf(['village_regulation', 'village_head_regulation', 'village_head_decision'], 'Invalid type of legal product')
        .required('Type is required')
});

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('file') as File | null;

        await legalProductSchema.validate(data, { abortEarly: false });

        const existinglegalProduct = await db.legalProduct.findUnique({ where: { id: Number(params.id) } });
        if (!existinglegalProduct) {
            return NextResponse.json({
                error: 'Regulation not found',
                message: 'Regulation not found',
                status: false,
            }, { status: 404 });
        }

        let filePath = existinglegalProduct.file;
        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            if (existinglegalProduct.file) {
                await unlink(join('./public/assets/legal', existinglegalProduct.file));
            }
            const fileLegalProduct = `${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            filePath = fileLegalProduct;
            const path = join('./public/assets/legal', fileLegalProduct);
            await writeFile(path, buffer);
        }

        const updateLegalProduct = await db.legalProduct.update({
            where: { id: Number(params.id) },
            data: { ...data, id: Number(params.id), file: filePath },
        });

        return NextResponse.json({
            data: updateLegalProduct,
            message: "Legal product updated successfully",
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
            error: 'Failed to update legal product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const legalProduct = await db.legalProduct.findUnique({ where: { id: Number(params.id) } });
        if (!legalProduct) {
            return NextResponse.json({
                error: 'Legal Product not found',
                message: 'Legal product not found',
                status: false,
            }, { status: 404 });
        }

        if (legalProduct.file) {
            await unlink(join('./public/assets/legal', legalProduct.file));
        }

        await db.legalProduct.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Legal product deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete legal product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
