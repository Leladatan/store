"use client";

import Heading from "@/components/ui/heading";
import {Separator} from "@/components/ui/separator";
import {FC} from "react";
import {columns} from "@/app/(dashboard)/[storeId]/orders/components/columns";
import {DataTable} from "@/components/ui/data-table";
import {OrderColumn} from "@/app/(dashboard)/[storeId]/orders/components/columns";

interface OrderClientProps {
    data: OrderColumn[];
}

const OrderClient: FC<OrderClientProps> = ({data}) => {

    return (
        <>
            <Heading title={`Orders (${data.length})`} description="Manage orders for your store" />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    );
};

export default OrderClient;
