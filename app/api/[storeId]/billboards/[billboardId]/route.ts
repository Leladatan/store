import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const GET = async (req: Request, {params}: {params: { billboardId: string}}) => {
    try {
        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", {status: 400});
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const PATCH = async (req: Request, {params}: {params: {storeId: string, billboardId: string}}) => {
    try {
        const UserId = auth().userId;
        const body = await req.json();

        const {label, imageUrl} = body;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!label) {
            return new NextResponse("Label is required", {status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {status: 400});
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", {status: 400});
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

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId
            },
            data: {
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARDS_PATCH]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const DELETE = async (req: Request, {params}: {params: {storeId: string, billboardId: string}}) => {
    try {
        const UserId = auth().userId;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!params.billboardId) {
            return new NextResponse("Billboard id is required", {status: 400});
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARDS_DELETE]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};
