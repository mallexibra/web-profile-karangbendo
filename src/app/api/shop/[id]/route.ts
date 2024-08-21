import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile, unlink } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const shopSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    identity: yup.mixed<File>().required('Identity is required and must be a file'),
    userId: yup.number().required('User ID is required and must be a number').integer(),
    location: yup.string().required('Location is required and must be a string'),
    phone: yup.string().required('Phone is required and must be a string'),
});

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('identity') as File | null;

        await shopSchema.validate(data, { abortEarly: false });

        const existingShop = await db.shop.findUnique({ where: { id: Number(params.id) } });
        if (!existingShop) {
            return NextResponse.json({
                error: 'Shop not found',
                message: 'Shop not found',
                status: false,
            }, { status: 404 });
        }

        let imagePath = existingShop.identity;
        if (image) {
            if (existingShop.identity) {
                await unlink(join('./assets/shops', existingShop.identity));
            }
            const imgShop = `${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imagePath = imgShop;
            const path = join('./assets/shops', imgShop);
            await writeFile(path, buffer);
        }

        const updateShop = await db.shop.update({
            where: { id: Number(params.id) },
            data: { ...data, identity: imagePath },
        });

        return NextResponse.json({
            data: updateShop,
            message: "Shop updated successfully",
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
            error: 'Failed to update shop',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
    try {
        const shop = await db.shop.findUnique({ where: { id: Number(params.id) } });
        if (!shop) {
            return NextResponse.json({
                error: 'Shop not found',
                message: 'Shop not found',
                status: false,
            }, { status: 404 });
        }

        if (shop.identity) {
            await unlink(join('./assets/shops', shop.identity));
        }

        await db.shop.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Shop deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete shop',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
