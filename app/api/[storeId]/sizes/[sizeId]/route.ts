import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const GET = async (req: Request, {params}: {params: {sizeId: string}}) => {
    try {
        if (!params.sizeId) {
            return new NextResponse("Category id is required", {status: 400});
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZES_GET]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const PATCH = async (req: Request, {params}: {params: {storeId: string, sizeId: string}}) => {
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

        if (!params.sizeId) {
            return new NextResponse("Size id is required", {status: 400});
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

        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value,
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZES_PATCH]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const DELETE = async (req: Request, {params}: {params: {storeId: string, sizeId: string}}) => {
    try {
        const UserId = auth().userId;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!params.sizeId) {
            return new NextResponse("Size id is required", {status: 400});
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

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId
            }
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZES_DELETE]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};
