import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const villageInstitutionSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
});

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const data = await request.json();

        await villageInstitutionSchema.validate({name: data.name}, { abortEarly: false });

        const existingApparatus = await db.villageInstitution.findUnique({ where: { id: Number(params.id) } });
        if (!existingApparatus) {
            return NextResponse.json({
                error: 'Village apparatus not found',
                message: 'Village apparatus not found',
                status: false,
            }, { status: 404 });
        }

        const updatedProfile = await db.villageInstitution.update({
            where: { id: Number(params.id) }, data
        });

        return NextResponse.json({
            data: updatedProfile,
            message: "Village institution updated successfully",
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
            error: 'Failed to update village institution',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    console.log(params)
    try {
        const villageApparatus = await db.villageInstitution.findUnique({ where: { id: Number(params.id) } });
        if (!villageApparatus) {
            return NextResponse.json({
                error: 'Village institution not found',
                message: 'Village institution not found',
                status: false,
            }, { status: 404 });
        }

        await db.villageInstitution.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Village institution deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete village institution',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
