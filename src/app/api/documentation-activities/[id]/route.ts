import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';

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
                const publicId = existingDocumentationActivities.image.split('/').pop()?.split('.')[0];
                if (publicId) await cloudinary.uploader.destroy(`documentation-activities/${publicId}`);
            }

            const timestamp = Date.now();
            const imgDoc = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}`;
            const buffer = Buffer.from(await image.arrayBuffer());

            const uploadResponse = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'documentation-activities', public_id: imgDoc },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                );
                stream.end(buffer);
            });

            imagePath = uploadResponse as string;
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
            const publicId = documentationActivities.image.split('/').pop()?.split('.')[0];
            if (publicId) await cloudinary.uploader.destroy(`documentation-activities/${publicId}`);
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
