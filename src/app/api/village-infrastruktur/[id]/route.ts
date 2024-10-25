
import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';

const villageInfrastrukturSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    image: yup.mixed<File | any>(),
});

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('image') as File | null;

        await villageInfrastrukturSchema.validate(data, { abortEarly: false });

        const existingVillageInfrastruktur = await db.villageInfrastruktur.findUnique({ where: { id: Number(params.id) } });
        if (!existingVillageInfrastruktur) {
            return NextResponse.json({
                error: 'Village infrastructure not found',
                message: 'Village infrastructure not found',
                status: false,
            }, { status: 404 });
        }

        let imagePath = existingVillageInfrastruktur.image;
        if (image) {

            if (existingVillageInfrastruktur.image) {
                const publicId = existingVillageInfrastruktur.image.split('/').pop()!.split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            const timestamp = Date.now();
            const imgInfrastruktur = `${timestamp}_${MD5(image.name.split('.')[0]).toString()}`;
            const buffer = Buffer.from(await image.arrayBuffer());


            const uploadedImage = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'village_infrastruktur', public_id: imgInfrastruktur },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                );
                stream.end(buffer);
            });

            imagePath = uploadedImage as string;
        }

        const updatedVillageInfrastruktur = await db.villageInfrastruktur.update({
            where: { id: Number(params.id) },
            data: { ...data, image: imagePath },
        });

        return NextResponse.json({
            data: updatedVillageInfrastruktur,
            message: "Village infrastructure updated successfully",
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
            error: 'Failed to update village infrastructure',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const villageInfrastruktur = await db.villageInfrastruktur.findUnique({ where: { id: Number(params.id) } });
        if (!villageInfrastruktur) {
            return NextResponse.json({
                error: 'Village infrastructure not found',
                message: 'Village infrastructure not found',
                status: false,
            }, { status: 404 });
        }

        if (villageInfrastruktur.image) {
            const publicId = villageInfrastruktur.image.split('/').pop()!.split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await db.villageInfrastruktur.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Village infrastructure deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete village infrastructure',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
