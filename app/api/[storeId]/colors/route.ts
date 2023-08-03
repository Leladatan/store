import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        const UserId: string | null = auth().userId;
        const body = await req.json();

        const {name, value} = body;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if (!value) {
            return new NextResponse("Value is required", {status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                UserId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403});
        }

        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        return NextResponse.json(color)
    } catch (error) {
        console.log('[COLORS_POST]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const GET = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }

        const colors = await prismadb.color.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(colors)
    } catch (error) {
        console.log('[COLORS_GET]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};
