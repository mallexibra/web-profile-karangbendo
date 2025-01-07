import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const villagePositionSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
});

export const GET = async () => {
    try {
        const villagePositions = await db.position.findMany();
        return NextResponse.json({
            data: villagePositions,
            message: "Fetched all Positions successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch Position',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        
        await villagePositionSchema.validate(data, { abortEarly: false });

        const newInstitution = await db.position.create({data});

        return NextResponse.json({
            data: newInstitution,
            message: "Position created successfully",
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
            error: 'Failed to create Position',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
