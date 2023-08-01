import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        const UserId: string | null = auth().userId;
        const body = await req.json();

        const {label, imageUrl} = body;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!label) {
            return new NextResponse("label is required", {status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", {status: 400});
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

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const GET = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(billboards)
    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};
