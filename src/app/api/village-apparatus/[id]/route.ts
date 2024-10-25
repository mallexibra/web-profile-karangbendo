import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';
const villageApparatusSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    position: yup.string().required('Position is required and must be a string'),
});

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('profile') as File | null;

        await villageApparatusSchema.validate(data, { abortEarly: false });

        const existingApparatus = await db.villageApparatus.findUnique({ where: { id: Number(params.id) } });
        if (!existingApparatus) {
            return NextResponse.json({
                error: 'Village apparatus not found',
                message: 'Village apparatus not found',
                status: false,
            }, { status: 404 });
        }

        let imagePath = existingApparatus.profile;
        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            if (existingApparatus.profile) {
                const publicId = existingApparatus.profile.split('/').pop().split('.')[0]; await cloudinary.uploader.destroy(publicId);
            }

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

            imagePath = uploadResponse as string;
        }

        const updatedProfile = await db.villageApparatus.update({
            where: { id: Number(params.id) },
            data: { ...data, id: Number(params.id), profile: imagePath },
        });

        return NextResponse.json({
            data: updatedProfile,
            message: "Village apparatus updated successfully",
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
            error: 'Failed to update village apparatus',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const villageApparatus = await db.villageApparatus.findUnique({ where: { id: Number(params.id) } });
        if (!villageApparatus) {
            return NextResponse.json({
                error: 'Village apparatus not found',
                message: 'Village apparatus not found',
                status: false,
            }, { status: 404 });
        }

        if (villageApparatus.profile) {
            const publicId = villageApparatus.profile.split('/').pop()!.split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await db.villageApparatus.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Village apparatus deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete village apparatus',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
