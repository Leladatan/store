import {NextPage} from "next";
import prismadb from "@/lib/prismadb";
import Calendar from "@/components/Calendar";

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
            <Calendar />
        </div>
    );
};

export default DashboardIdPage;
