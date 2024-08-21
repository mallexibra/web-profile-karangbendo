import db from "@/utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const id = Number(params.id);
        const data = await request.json();

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updateUser = await db.user.update({
            where: { id },
            data,
        });

        return NextResponse.json({
            data: updateUser,
            message: "Updated user successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to update user',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const id = Number(params.id);

        if (isNaN(id)) {
            return NextResponse.json({
                error: 'Invalid ID',
                message: 'The provided ID is not a valid number',
                status: false,
            }, { status: 400 });
        }

        await db.user.delete({ where: { id: Number(id) } });
        return NextResponse.json({
            message: "Deleted user successfully",
            status: true
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to deleted user',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
}