import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';

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

        const existingLegalProduct = await db.legalProduct.findUnique({ where: { id: Number(params.id) } });
        if (!existingLegalProduct) {
            return NextResponse.json({
                error: 'Regulation not found',
                message: 'Regulation not found',
                status: false,
            }, { status: 404 });
        }

        let filePath = existingLegalProduct.file;
        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            if (existingLegalProduct.file) {
                await cloudinary.uploader.destroy(existingLegalProduct.file.split('/').pop().split('.')[0]);
            }
            const timestamp = Date.now();
            const imgProfile = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}`;
            const buffer = Buffer.from(await image.arrayBuffer());

            const uploadResponse = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'legal-products', public_id: imgProfile },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                );
                stream.end(buffer);
            });

            filePath = uploadResponse as string;
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
            await cloudinary.uploader.destroy(legalProduct.file.split('/').pop().split('.')[0]);
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
