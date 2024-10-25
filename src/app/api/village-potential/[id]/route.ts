import { NextResponse } from 'next/server';
import db from '@/utils/database';
import cloudinary from '@/utils/cloudinary';
export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const villagePotential = await db.villagePotential.findUnique({ where: { id: Number(params.id) } });
        if (!villagePotential) {
            return NextResponse.json({
                error: 'Village potential not found',
                message: 'Village potential not found',
                status: false,
            }, { status: 404 });
        }

        if (villagePotential.image) {
            const publicId = villagePotential.image.split('/').pop()!.split('.')[0];
            await cloudinary.uploader.destroy(`village_potential/${publicId}`);
        }

        await db.villagePotential.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Village potential deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete village potential',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
