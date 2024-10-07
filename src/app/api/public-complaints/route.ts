import { NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';

const publicComplaintsSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    complaint: yup.mixed<'fasilitas_umum'>().oneOf(['fasilitas_umum'], 'Invalid complaint type').required(),
    email: yup.string().email('Invalid email format').nullable(),
    phone: yup.string().nullable(),
    supportingEvidence: yup.mixed<File>().nullable(),
});

export const GET = async () => {
    try {
        const publicComplaints = await db.publicComplaints.findMany();
        return NextResponse.json({
            data: publicComplaints,
            message: "Fetched all public complaints successfully",
            status: true,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch public complaints',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        console.log("FormData:", formData)
        const data: any = {
            name: formData.get('name') as string,
            complaint: formData.get('complaint') as string,
            email: formData.get('email') as string | null,
            phone: formData.get('phone') as string | null,
            supportingEvidence: formData.get('image') as File | null,
        };

        await publicComplaintsSchema.validate(data, { abortEarly: false });

        const image = data.supportingEvidence;
        if (!image) {
            throw new Error('Supporting evidence file is missing');
        }
        const timestamp = Date.now();
        const imgProfile = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const imagePath = imgProfile;
        const path = join('./public/assets/public-complaints', imgProfile);
        await writeFile(path, buffer);

        const newPublicComplaints = await db.publicComplaints.create({
            data: {
                ...data,
                supportingEvidence: imagePath,
            },
        });

        return NextResponse.json({
            data: newPublicComplaints,
            message: "Public complaints created successfully",
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
            error: 'Failed to create public complaints',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
