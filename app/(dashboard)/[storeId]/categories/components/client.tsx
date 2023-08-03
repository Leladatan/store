"use client";

import Heading from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {useParams, useRouter} from "next/navigation";
import {FC} from "react";
import {columns} from "@/app/(dashboard)/[storeId]/categories/components/columns";
import {DataTable} from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import {CategoryColumn} from "@/app/(dashboard)/[storeId]/categories/components/columns";

interface CategoryClientProps {
    data: CategoryColumn[];
}

const CategoryClient: FC<CategoryClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Categories" />
            <Separator />
            <ApiList entityIdName="categoryId" entityName="categories" />
        </>
    );
};

export default CategoryClient;
