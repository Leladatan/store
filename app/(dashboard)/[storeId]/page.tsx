import {NextPage} from "next";
import prismadb from "@/lib/prismadb";

interface DashboardIdPageProps {
    params: {storeId: string}
}

const DashboardIdPage: NextPage<DashboardIdPageProps> = async ({params}) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    });

    return (
        <div>
            Dashboard: {store?.name}
        </div>
    );
};

export default DashboardIdPage;
