import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";

const SetupLayout = async ({children}: {children: React.ReactNode}) => {
    const UserId = auth().userId;

    if (!UserId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            UserId
        }
    });

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    );
};

export default SetupLayout;
