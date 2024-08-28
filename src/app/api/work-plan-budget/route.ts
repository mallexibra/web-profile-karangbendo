import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const workPlanAndBudgetSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    budget: yup.number().required('Budget is required and must be a number').integer(),
    description: yup.string().required('Description is required and must be a string'),
    date: yup.date().required('Date is required and must be a valid date'),
});

export const GET = async () => {
    try {
        const workPlanAndBudget = await db.workPlanAndBudget.findMany();
        return NextResponse.json({
            data: workPlanAndBudget,
            message: "Fetched all work plan and budget successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch work plan and budget',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const data = await request.json();

        await workPlanAndBudgetSchema.validate(data, { abortEarly: false });

        const newworkPlanAndBudget = await db.workPlanAndBudget.create({
            data: { ...data, date: new Date(data.date) }
        });

        return NextResponse.json({
            data: newworkPlanAndBudget,
            message: "Work plan and budget created successfully",
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
            error: 'Failed to create work plan and budget',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};