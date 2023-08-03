import prismadb from "@/lib/prismadb";
import {format} from "date-fns";
import {ColorColumn} from "@/app/(dashboard)/[storeId]/colors/components/columns";
import ColorClient from "@/app/(dashboard)/[storeId]/colors/components/client";

const ColorsPage = async ({params}: {params: {storeId: string}}) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            creadtedAt: 'desc'
        }
    });

    const formattedColors: ColorColumn[] = colors.map(color => ({
        id: color.id,
        name: color.name,
        value: color.value,
        createdAt: format(color.creadtedAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorClient data={formattedColors} />
            </div>
        </div>
    );
};

export default ColorsPage;
