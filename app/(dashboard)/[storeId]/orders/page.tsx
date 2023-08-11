import prismadb from "@/lib/prismadb";
import {format} from "date-fns";
import {OrderColumn} from "@/app/(dashboard)/[storeId]/orders/components/columns";
import OrderClient from "@/app/(dashboard)/[storeId]/orders/components/client";
import {formatter} from "@/lib/utils";

const OrdersPage = async ({params}: {params: {storeId: string}}) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            },
        },
        orderBy: {
            creadtedAt: 'desc'
        }
    });

    const formattedOrders: OrderColumn[] = orders.map((order: any) => ({
        id: order.id,
        phone: order.phone,
        address: order.address,
        products: order.orderItems.map((orderItem: any) => orderItem.name).join(', '),
        totalPrice: formatter.format(order.orderItems.reduce((total: number, item: any) => {
            return total + Number(item.product.price)
        }, 0)),
        isPaid: order.isPaid,
        createdAt: format(order.creadtedAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
};

export default OrdersPage;