import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const villageInstitutionSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
});

export const GET = async () => {
    try {
        const villageApparatus = await db.villageInstitution.findMany();
        return NextResponse.json({
            data: villageApparatus,
            message: "Fetched all village institutions successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch village institution',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        
        await villageInstitutionSchema.validate(data, { abortEarly: false });

        const newInstitution = await db.villageInstitution.create({data});

        return NextResponse.json({
            data: newInstitution,
            message: "Village institution created successfully",
            status: true,
        }, { status: 201 });

    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return NextResponse.json({
                error: 'validation',
                message: error.errors,
                status: false,
            }, { status: 400 });
        }

        return NextResponse.json({
            error: 'Failed to create village institution',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
