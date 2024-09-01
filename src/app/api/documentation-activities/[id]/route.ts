import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const documentationActivitiesSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    image: yup.mixed<File>().required('Image is required'),
});

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('image') as File | null;

        await documentationActivitiesSchema.validate(data, { abortEarly: false });

        const existingDocumentationActivities = await db.documentationActivities.findUnique({ where: { id: Number(params.id) } });
        if (!existingDocumentationActivities) {
            return NextResponse.json({
                error: 'Documentation activities not found',
                message: 'Documentation activities not found',
                status: false,
            }, { status: 404 });
        }

        let imagePath = existingDocumentationActivities.image;
        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            if (existingDocumentationActivities.image) {
                await unlink(join('./public/assets/documentation-activities', existingDocumentationActivities.image));
            }
            const imgdocumentationActivities = `${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imagePath = imgdocumentationActivities;
            const path = join('./public/assets/documentation-activities', imgdocumentationActivities);
            await writeFile(path, buffer);
        }

        const updateDocumentationActivities = await db.documentationActivities.update({
            where: { id: Number(params.id) },
            data: { ...data, image: imagePath },
        });

        return NextResponse.json({
            data: updateDocumentationActivities,
            message: "Documentation activities updated successfully",
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
            error: 'Failed to update documentation activities',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const documentationActivities = await db.documentationActivities.findUnique({ where: { id: Number(params.id) } });
        if (!documentationActivities) {
            return NextResponse.json({
                error: 'Documentation activities not found',
                message: 'Documentation activities not found',
                status: false,
            }, { status: 404 });
        }

        if (documentationActivities.image) {
            await unlink(join('./public/assets/documentation-activities', documentationActivities.image));
        }

        await db.documentationActivities.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Documentation activities deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete documentation activities',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
