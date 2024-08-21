import db from "@/utils/database";
import { NextResponse } from "next/server"
import * as yup from "yup";
import bcrypt from 'bcrypt';

export const GET = async () => {
    try {
        const users = await db.user.findMany();

        const usersWithoutPassword = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);

        return NextResponse.json({
            data: usersWithoutPassword,
            message: "Get all data users successfully",
            status: true
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch users',
            message: error.message,
            status: false
        }, { status: 500 });
    }
}

const userSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    email: yup.string().email('Invalid email format').required('Email is required and must be a string'),
    phone: yup.string().required('Phone is required and must be a string'),
    password: yup.string().required('Password is required and must be a string'),
    verified: yup.date().nullable(),
    position: yup.mixed<'village_head' | 'employee'>().nullable(),
    role: yup.mixed<'village_head' | 'employee' | 'admin' | 'umkm'>().oneOf(['village_head', 'employee', 'admin', 'umkm'], 'Invalid role')
});

export const POST = async (request: Request) => {
    try {
        const data = await request.json();

        await userSchema.validate(data, { abortEarly: false });

        const existingUser = await db.user.findUnique({
            where: { email: data.email }
        });

        if (existingUser) {
            return NextResponse.json({
                error: 'validation',
                message: ['The email address is already in use'],
                status: false,
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await db.user.create({ data: { ...data, password: hashedPassword } });

        return NextResponse.json({
            data: newUser,
            message: "User created successfully",
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
            error: 'Failed to create user',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
