import prismadb from "@/lib/prismadb";
import {format} from "date-fns";
import {SizeColumn} from "@/app/(dashboard)/[storeId]/sizes/components/columns";
import SizeClient from "@/app/(dashboard)/[storeId]/sizes/components/client";

const SizesPage = async ({params}: {params: {storeId: string}}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            creadtedAt: 'desc'
        }
    });

    const formattedSizes: SizeColumn[] = sizes.map(size => ({
        id: size.id,
        name: size.name,
        value: size.value,
        createdAt: format(size.creadtedAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
