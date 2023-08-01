import BillboardClient from "@/app/(dashboard)/[storeId]/billboards/components/client";
import prismadb from "@/lib/prismadb";
import {BillboardColumn} from "@/app/(dashboard)/[storeId]/billboards/components/columns";
import {format} from "date-fns";

const BillboardsPage = async ({params}: {params: {storeId: string}}) => {
    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            creadtedAt: 'desc'
        }
    });

    const formattedBillboards: BillboardColumn[] = billboards.map(billboard => ({
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.creadtedAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    );
};

export default BillboardsPage;
