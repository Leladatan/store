import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const GET = async (req: Request, {params}: {params: {categoryId: string}}) => {
    try {
        if (!params.categoryId) {
            return new NextResponse("Category id is required", {status: 400});
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId
            },
            include: {
                billboard: true
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const PATCH = async (req: Request, {params}: {params: {storeId: string, categoryId: string}}) => {
    try {
        const UserId = auth().userId;
        const body = await req.json();

        const {name, billboardId} = body;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", {status: 400});
        }

        if (!params.categoryId) {
            return new NextResponse("Category id is required", {status: 400});
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

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORIES_PATCH]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const DELETE = async (req: Request, {params}: {params: {storeId: string, categoryId: string}}) => {
    try {
        const UserId = auth().userId;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!params.categoryId) {
            return new NextResponse("Category id is required", {status: 400});
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORIES_DELETE]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};
