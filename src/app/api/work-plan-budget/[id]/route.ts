import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const workPlanAndBudgetSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    budget: yup.number().required('Budget is required and must be a number').integer(),
    description: yup.string().required('Description is required and must be a string'),
    date: yup.date().required('Date is required and must be a valid date'),
});

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const data = await request.json();

        await workPlanAndBudgetSchema.validate(data, { abortEarly: false });

        const existingWorkPlanAndBudget = await db.workPlanAndBudget.findUnique({ where: { id: Number(params.id) } });
        if (!existingWorkPlanAndBudget) {
            return NextResponse.json({
                error: 'Work plan and budget not found',
                message: 'Work plan and budget not found',
                status: false,
            }, { status: 404 });
        }

        const updateWorkPlanAndBudget = await db.workPlanAndBudget.update({
            where: { id: Number(params.id) }, data
        });

        return NextResponse.json({
            data: updateWorkPlanAndBudget,
            message: "Work plan and budget updated successfully",
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
            error: 'Failed to update work plan and budget',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const workPlanAndBudget = await db.workPlanAndBudget.findUnique({ where: { id: Number(params.id) } });
        if (!workPlanAndBudget) {
            return NextResponse.json({
                error: 'Work plan and budget not found',
                message: 'Work plan and budget not found',
                status: false,
            }, { status: 404 });
        }

        await db.workPlanAndBudget.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Work plan and budget deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete work plan and budget',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
