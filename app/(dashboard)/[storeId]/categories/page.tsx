import prismadb from "@/lib/prismadb";
import {format} from "date-fns";
import {CategoryColumn} from "@/app/(dashboard)/[storeId]/categories/components/columns";
import CategoryClient from "@/app/(dashboard)/[storeId]/categories/components/client";

const CategoriesPage = async ({params}: {params: {storeId: string}}) => {
    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            billboard: true,
        },
        orderBy: {
            creadtedAt: 'desc'
        }
    });

    const formattedCategories: CategoryColumn[] = categories.map(category => ({
        id: category.id,
        name: category.name,
        billboardLabel: category.billboard.label,
        createdAt: format(category.creadtedAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    );
};

export default CategoriesPage;
