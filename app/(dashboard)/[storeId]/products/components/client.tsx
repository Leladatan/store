"use client";

import Heading from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {FC} from "react";
import {columns} from "@/app/(dashboard)/[storeId]/products/components/columns";
import {DataTable} from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import {ProductColumn} from "@/app/(dashboard)/[storeId]/products/components/columns";

interface ProductClientProps {
    data: ProductColumn[];
}

const ProductClient: FC<ProductClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${data.length})`} description="Manage products for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Products" />
            <Separator />
            <ApiList entityIdName="productId" entityName="products" />
        </>
    );
};

export default ProductClient;
