import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const villageGovernmentFinanceSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    type: yup.mixed<'income' | 'expenditure'>().oneOf(['income', 'expenditure'], 'Invalid type of finance').required('Type is required'),
    amount: yup.number().required('Amount is required and must be a number').integer(),
});

export const GET = async () => {
    try {
        const villageGovernmentFinances = await db.villageGovernmentFinance.findMany();
        return NextResponse.json({
            data: villageGovernmentFinances,
            message: "Fetched all village government finance successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch village government finance',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const data = await request.json();

        await villageGovernmentFinanceSchema.validate(data, { abortEarly: false });

        const newvillageGovernmentFinance = await db.villageGovernmentFinance.create({
            data
        });

        return NextResponse.json({
            data: newvillageGovernmentFinance,
            message: "Village government finance created successfully",
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
            error: 'Failed to create village government finance',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};