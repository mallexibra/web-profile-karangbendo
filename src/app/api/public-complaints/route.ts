import { NextResponse } from 'next/server';
import { MD5 } from 'crypto-js';
import db from '@/utils/database';
import * as yup from 'yup';
import cloudinary from '@/utils/cloudinary';
const publicComplaintsSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    complaint: yup.string().required("Type of complaint is required"),
    email: yup.string().email('Invalid email format').nullable(),
    phone: yup.string().nullable(),
    image: yup.mixed<File>().nullable(),
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
        const data: any = {
            name: formData.get('name') as string,
            complaint: formData.get('complaint') as string,
            emailOrPhone: formData.get('emailOrPhone') as string | null,
            image: formData.get('image') as File | null,
            description: formData.get('description') as string
        };

        await publicComplaintsSchema.validate(data, { abortEarly: false });

        const image = data.image;
        if (!image) {
            throw new Error('Supporting evidence file is missing');
        }

        const timestamp = Date.now();
        const imgProfile = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}`;
        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'public-complaints', public_id: imgProfile },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result?.secure_url);
                }
            );
            stream.end(buffer);
        });

        delete data.image;

        const newPublicComplaints = await db.publicComplaints.create({
            data: {
                ...data,
                supportingEvidence: uploadResponse as string,
            },
        });

        return NextResponse.json({
            data: newPublicComplaints,
            message: "Public complaint created successfully",
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
            error: 'Failed to create public complaint',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
};
