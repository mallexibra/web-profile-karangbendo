import { NextResponse } from 'next/server';
import db from '@/utils/database';
import * as yup from 'yup';

const villageGovernmentFinanceSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    type: yup.mixed<'income' | 'expenditure'>().oneOf(['income', 'expenditure'], 'Invalid type of finance').required('Type is required'),
    amount: yup.number().required('Amount is required and must be a number').integer(),
});

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const data = await request.json();

        await villageGovernmentFinanceSchema.validate(data, { abortEarly: false });

        const existingVillageGovernmentFinance = await db.villageGovernmentFinance.findUnique({ where: { id: Number(params.id) } });
        if (!existingVillageGovernmentFinance) {
            return NextResponse.json({
                error: 'Village government finance not found',
                message: 'Village government finance not found',
                status: false,
            }, { status: 404 });
        }

        const updateVillageGovernmentFinance = await db.villageGovernmentFinance.update({
            where: { id: Number(params.id) }, data
        });

        return NextResponse.json({
            data: updateVillageGovernmentFinance,
            message: "Village government finance updated successfully",
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
            error: 'Failed to update village government finance',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async ({ params }: { params: { id: string } }) => {
    try {
        const villageGovernmentFinance = await db.villageGovernmentFinance.findUnique({ where: { id: Number(params.id) } });
        if (!villageGovernmentFinance) {
            return NextResponse.json({
                error: 'Village government finance not found',
                message: 'Village government finance not found',
                status: false,
            }, { status: 404 });
        }

        await db.villageGovernmentFinance.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Village government finance deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete village government finance',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
