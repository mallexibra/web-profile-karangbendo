import db from "@/utils/database"
import { MD5 } from "crypto-js";
import { writeFile, unlink } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import * as yup from 'yup';

const communityActivitiesSchema = yup.object({
    name: yup.string().required('Name is required and must be a string'),
    description: yup.string().required('Description is required and must be a string'),
    time: yup.date().required('Time is required and must be a valid date'),
});

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const formData = await request.formData();
        const data: any = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            time: new Date(formData.get('time')?.toString() || ''),
        }

        const image = formData.get('image') as File | null;

        await communityActivitiesSchema.validate({ ...data, image }, { abortEarly: false });

        const existingCommunityActivities = await db.communityActivities.findUnique({ where: { id: Number(params.id) } });

        if (!existingCommunityActivities) {
            return NextResponse.json({
                error: 'Community activities not found',
                message: 'Community activities not found',
                status: false
            }, { status: 404 });
        }

        let imagePath = existingCommunityActivities.image;
        if (image && typeof image.name === 'string' && typeof image.size === 'number') {
            if (existingCommunityActivities.image) {
                await unlink(join('./public/assets/community-activities', existingCommunityActivities.image));
            }
            const timestamp = Date.now();
            const imgActivities = `${timestamp}_${MD5(image.name.split(".")[0]).toString()}.${image.name.split(".")[1]}`;
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            imagePath = imgActivities;
            const path = join('./public/assets/community-activities', imgActivities);
            await writeFile(path, buffer);
        }

        const updateActivities = await db.communityActivities.update({
            where: { id: Number(params.id) },
            data: {
                ...data, image: imagePath
            }
        });

        return NextResponse.json({
            data: updateActivities,
            message: "Community activities updated successfully",
            status: true,
        });
    } catch (error: any) {
        if (error.name === 'ValidationError') {
            return NextResponse.json({
                error: 'Validation error',
                message: error.errors,
                status: false,
            }, { status: 400 });
        }

        return NextResponse.json({
            error: 'Failed to update community activities',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const communityActivities = await db.communityActivities.findUnique({ where: { id: Number(params.id) } });
        if (!communityActivities) {
            return NextResponse.json({
                error: 'Communtity activities not found',
                message: 'Communtity activities not found',
                status: false,
            }, { status: 404 });
        }

        if (communityActivities.image) {
            await unlink(join('./public/assets/community-activities', communityActivities.image));
        }

        await db.communityActivities.delete({ where: { id: Number(params.id) } });

        return NextResponse.json({
            message: "Communtity activities deleted successfully",
            status: true,
        });

    } catch (error: any) {
        return NextResponse.json({
            error: 'Failed to delete communtity activities',
            message: error.message,
            status: false,
        }, { status: 500 });
    }
}
