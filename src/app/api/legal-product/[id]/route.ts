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

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const data = await request.json();

        await legalProductSchema.validate(data, { abortEarly: false });

        const existingLegalProduct = await db.legalProduct.findUnique({ where: { id: Number(params.id) } });
        if (!existingLegalProduct) {
            return NextResponse.json({
                error: 'Legal product not found',
                message: 'Legal product not found',
                status: false,
            }, { status: 404 });
        }

        const updateLegalProduct = await db.legalProduct.update({
            where: { id: Number(params.id) }, data
        });

        return NextResponse.json({
            data: updateLegalProduct,
            message: "Legal product updated successfully",
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
            error: 'Failed to update legal product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
    try {
        const legalProduct = await db.legalProduct.findUnique({ where: { id: Number(params.id) } });
        if (!legalProduct) {
            return NextResponse.json({
                error: 'Legal Product not found',
                message: 'Legal product not found',
                status: false,
            }, { status: 404 });
        }

        await db.legalProduct.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Legal product deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete legal product',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
