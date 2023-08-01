import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const PATCH = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        const UserId = auth().userId;
        const body = await req.json();

        const {name} = body;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                UserId
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const DELETE = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        const UserId = auth().userId;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                UserId
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};
