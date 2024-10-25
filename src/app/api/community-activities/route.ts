import cloudinary from "@/utils/cloudinary";
import db from "@/utils/database"
import { UploadApiResponse } from "cloudinary";
import { MD5 } from "crypto-js";
import { writeFile } from "fs/promises";
import { imageOptimizer } from "next/dist/server/image-optimizer";
import { NextResponse } from "next/server";
import { join } from "path";
import * as yup from 'yup';

const communityActivitiesSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    time: yup.date().required('Time is required and must be a valid date'),
    image: yup.mixed<File>().required('Image is required')
});

export const GET = async () => {
    try {
        const communityActivities = await db.communityActivities.findMany();
        return NextResponse.json({
            data: communityActivities,
            message: "Fetched all community activities successfully",
            status: true
        });
    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to fetch community activities',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
}

export const POST = async (request: Request) => {
    try {
        const formData = await request.formData();
        const data = {
            name: formData.get('name')?.toString() || '',
            description: formData.get('description')?.toString() || '',
            time: new Date(formData.get('time')?.toString() || ''),
        };

        const image = formData.get('image') as File;

        await communityActivitiesSchema.validate({ ...data, image }, { abortEarly: false });

        const timestamp = Date.now();
        const imgActivities = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}`;

        const buffer = await image.arrayBuffer();

        const uploadPromise = new Promise<UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'community-activities',
                    public_id: imgActivities,
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result as UploadApiResponse)
                    }
                }
            );

            stream.end(Buffer.from(buffer));
        });

        const uploadResponse = await uploadPromise;

        const newActivities = await db.communityActivities.create({
            data: {
                ...data,
                image: uploadResponse.secure_url
            },
        });

        return NextResponse.json({
            data: newActivities,
            message: "Community activities created successfully",
            status: true,
        }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return NextResponse.json({
                error: 'Validation error',
                message: error.errors,
                status: false,
            }, { status: 400 });
        }

        return NextResponse.json({
            error: 'Failed to create community activities',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
}
