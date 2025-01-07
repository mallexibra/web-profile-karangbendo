import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const villagePositionSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
});

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const data = await request.json();

        await villagePositionSchema.validate({name: data.name}, { abortEarly: false });

        const existingApparatus = await db.position.findUnique({ where: { id: Number(params.id) } });
        if (!existingApparatus) {
            return NextResponse.json({
                error: 'Village position not found',
                message: 'Village position not found',
                status: false,
            }, { status: 404 });
        }

        const updatedProfile = await db.position.update({
            where: { id: Number(params.id) }, data
        });

        return NextResponse.json({
            data: updatedProfile,
            message: "Village Position updated successfully",
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
            error: 'Failed to update Village Position',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    console.log(params)
    try {
        const villageApparatus = await db.position.findUnique({ where: { id: Number(params.id) } });
        if (!villageApparatus) {
            return NextResponse.json({
                error: 'Village Position not found',
                message: 'Village Position not found',
                status: false,
            }, { status: 404 });
        }

        await db.position.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Village Position deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete Village Position',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
