import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const villageInfrastrukturSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    image: yup.mixed<File>().required('Image is required'),
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
                error: 'Village infrastruktur not found',
                message: 'Village infrastruktur not found',
                status: false,
            }, { status: 404 });
        }

        let imagePath = existingVillageInfrastruktur.image;
        if (image) {
            if (existingVillageInfrastruktur.image) {
                await unlink(join('./assets/village-infrastruktur', existingVillageInfrastruktur.image));
            }
            const imgInfrastruktur = `${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imagePath = imgInfrastruktur;
            const path = join('./assets/village-infrastruktur', imgInfrastruktur);
            await writeFile(path, buffer);
        }

        const updatevillageInfrastruktur = await db.villageInfrastruktur.update({
            where: { id: Number(params.id) },
            data: { ...data, image: imagePath },
        });

        return NextResponse.json({
            data: updatevillageInfrastruktur,
            message: "Village infrastruktur updated successfully",
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
            error: 'Failed to update village infrastruktur',
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
                error: 'Village infrastruktur not found',
                message: 'Village infrastruktur not found',
                status: false,
            }, { status: 404 });
        }

        if (villageInfrastruktur.image) {
            await unlink(join('./public/assets/village-infrastruktur', villageInfrastruktur.image));
        }

        await db.villageInfrastruktur.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Village infrastruktur deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete village infrastruktur',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
