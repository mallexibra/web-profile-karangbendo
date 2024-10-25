import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import cloudinary from '@/utils/cloudinary';
export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const shop = await db.shop.findFirst({ where: { id: Number(params.id) }, include: { product: true } });
        return NextResponse.json({
            data: shop,
            message: "Fetched shop successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch shop',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData.entries());
        const image = formData.get('identity') as File | null;

        const status = data.status === 'true';

        const existingShop = await db.shop.findUnique({ where: { id: Number(params.id) } });
        if (!existingShop) {
            return NextResponse.json({
                error: 'Shop not found',
                message: 'Shop not found',
                status: false,
            }, { status: 404 });
        }

        let imagePath = existingShop.identity;
        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            const timestamp = Date.now();
            const imgShop = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}`;
            const buffer = Buffer.from(await image.arrayBuffer());

            const uploadResponse = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'shops_identity', public_id: imgShop },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url);
                    }
                );
                stream.end(buffer);
            });

            imagePath = uploadResponse as string;
        }

        const updateShop = await db.shop.update({
            where: { id: Number(params.id) },
            data: { ...data, id: Number(params.id), ...(data.userId && { userId: Number(data.userId) }), status, identity: imagePath },
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

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const shopId = Number(params.id);
        const shop = await db.shop.findUnique({ where: { id: shopId } });
        if (!shop) {
            return NextResponse.json({
                error: 'Shop not found',
                message: 'Shop not found',
                status: false,
            }, { status: 404 });
        }

        if (shop.identity) {
            const publicId = shop.identity.split('/').pop()!.split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await db.shop.delete({ where: { id: shopId } });

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
