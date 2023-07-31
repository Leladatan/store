import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/Navbar";

const DashboardLayout = async ({children, params}: {children: React.ReactNode, params: {storeId: string}}) => {
    const UserId = auth().userId;

    if (!UserId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            UserId
        }
    });

    if (!store) {
        redirect('/');
    }

    return(
        <>
            <Navbar />
            {children}
        </>
    )
}

export default DashboardLayout;
