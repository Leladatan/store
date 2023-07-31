import {type FC} from 'react';
import {auth, UserButton} from "@clerk/nextjs";
import MainNav from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar: FC = async () => {
    const UserId = auth().userId;

    if (!UserId) {
        redirect('/sign-in');
    }

    const stores = await prismadb.store.findMany({
        where: {
            UserId
        }
    });

    return (
        <div className="border-b">
            <div className="flex items-center h-16 px-4">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
