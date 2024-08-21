import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const legalProductSchema = yup.object({
    title: yup.string().required('Title is required and must be a string'),
    number: yup.string().required('Number is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    type: yup.mixed<'village_regulation' | 'village_head_regulation' | 'village_head_decision'>()
        .oneOf(['village_regulation', 'village_head_regulation', 'village_head_decision'], 'Invalid type of legal product')
        .required('Type is required')
});

export const GET = async () => {
    try {
        const legalProduct = await db.legalProduct.findMany();
        return NextResponse.json({
            data: legalProduct,
            message: "Fetched all legal product successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch legal product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const data = await request.json();

        await legalProductSchema.validate(data, { abortEarly: false });

        const newLegalProduct = await db.legalProduct.create({
            data
        });

        return NextResponse.json({
            data: newLegalProduct,
            message: "Legal product created successfully",
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
            error: 'Failed to create legal product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};