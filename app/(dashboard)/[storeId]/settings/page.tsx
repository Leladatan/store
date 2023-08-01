import {NextPage} from "next";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";
import SettingsForm from "@/app/(dashboard)/[storeId]/settings/components/form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

const SettingsPage: NextPage<SettingsPageProps> = async ({params}) => {
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

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store} />
            </div>
        </div>
    );
};

export default SettingsPage;
