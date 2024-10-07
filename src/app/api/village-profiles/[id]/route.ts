import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const villageProfileSchema = yup.object({
    visi: yup.string().required('Visi is required and must be a string'),
    misi: yup.string().required('Misi is required and must be a string'),
    resident: yup.number().required('Resident is required and must be a number').integer(),
    children: yup.number().required('Children is required and must be a number').integer(),
    mature: yup.number().required('Mature is required and must be a number').integer(),
    old: yup.number().required('Old is required and must be a number').integer(),
});

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('image') as File | null;

        await villageProfileSchema.validate(data, { abortEarly: false });

        const existingVillage = await db.villageProfile.findUnique({ where: { id: Number(params.id) } });
        if (!existingVillage) {
            return NextResponse.json({
                error: 'Village profile not found',
                message: 'Village profile not found',
                status: false,
            }, { status: 404 });
        }

        let imagePath = existingVillage.image;
        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            if (existingVillage.image) {
                await unlink(join('./public/assets/village-profile', existingVillage.image));
            }
            const timestamp = Date.now();
            const imgVillage = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imagePath = imgVillage;
            const path = join('./public/assets/village-profile', imgVillage);
            await writeFile(path, buffer);
        }

        const updatedVillage = await db.villageProfile.update({
            where: { id: Number(params.id) },
            data: {
                ...data,
                id: parseInt(data.id as string, 10),
                image: imagePath,
                old: parseInt(data.old as string, 10),
                mature: parseInt(data.mature as string, 10),
                children: parseInt(data.children as string, 10),
                resident: parseInt(data.resident as string, 10),
            },
        });

        return NextResponse.json({
            data: updatedVillage,
            message: "Village profile updated successfully",
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
            error: 'Failed to update village profile',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const villageId = Number(params.id);
        const villageProfile = await db.villageProfile.findUnique({ where: { id: villageId } });
        if (!villageProfile) {
            return NextResponse.json({
                error: 'Village profile not found',
                message: 'Village profile not found',
                status: false,
            }, { status: 404 });
        }

        if (villageProfile.image) {
            await unlink(join('./public/assets/village-profile', villageProfile.image));
        }

        await db.villageProfile.delete({ where: { id: villageId } });

        return NextResponse.json({
            message: "Village profile deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete village profile',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
