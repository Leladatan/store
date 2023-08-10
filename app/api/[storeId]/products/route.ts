import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        const UserId: string | null = auth().userId;
        const body = await req.json();

        const {name, price, categoryId, colorId, sizeId, isFeatured, isArchived, images} = body;

        if (!UserId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if (!price) {
            return new NextResponse("Price is required", {status: 400});
        }

        if (!images || !images.length) {
            return new NextResponse("Images is required", {status: 400});
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", {status: 400});
        }

        if (!colorId) {
            return new NextResponse("Color id is required", {status: 400});
        }

        if (!sizeId) {
            return new NextResponse("Size id is required", {status: 400});
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

        const products = await prismadb.product.create({
            data: {
                name,
                price,
                images: {
                    createMany: {
                        data: [...images.map((image: {url: string}) => image)]
                    }
                },
                colorId,
                categoryId,
                sizeId,
                isFeatured,
                isArchived,
                storeId: params.storeId
            }
        });

        return NextResponse.json(products)
    } catch (error) {
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};

export const GET = async (req: Request, {params}: {params: {storeId: string}}) => {
    try {
        const {searchParams} = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured = searchParams.get("isFeatured");

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products)
    } catch (error) {
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("Interval error", {status: 500});
    }
};
