// src/app/api/village-profile/[id]/route.ts
import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

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
                await unlink(join('./public/assets/village-apparatus', existingApparatus.profile));
            }
            const imgProfile = `${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imagePath = imgProfile;
            const path = join('./public/assets/village-apparatus', imgProfile);
            await writeFile(path, buffer);
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
    console.log(params)
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
            await unlink(join('./public/assets/village-apparatus', villageApparatus.profile));
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
