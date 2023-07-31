import {NextPage} from "next";
import {UserButton} from "@clerk/nextjs";

const SetupPage: NextPage = () => {
    return (
        <div className="p-4">
            <UserButton afterSignOutUrl="/" />
        </div>
    )
};

export default SetupPage;
