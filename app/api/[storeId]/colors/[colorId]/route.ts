import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const GET = async (req: Request, {params}: {params: {colorId: string}}) => {
    try {
        if (!params.colorId) {
            return new NextResponse("Color id is required", {status: 400});
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId
            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLORS_GET]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const PATCH = async (req: Request, {params}: {params: {storeId: string, colorId: string}}) => {
    try {
        const UserId = auth().userId;
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

        if (!params.colorId) {
            return new NextResponse("Color id is required", {status: 400});
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

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId
            },
            data: {
                name,
                value,
            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLORS_PATCH]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const DELETE = async (req: Request, {params}: {params: {storeId: string, colorId: string}}) => {
    try {
        const UserId = auth().userId;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!params.colorId) {
            return new NextResponse("Color id is required", {status: 400});
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

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId
            }
        });

        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLORS_DELETE]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};
