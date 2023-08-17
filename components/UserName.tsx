"use client";

import {type FC} from 'react';
import {useUser} from "@clerk/nextjs";
import {Loader} from "@/components/ui/loader";

const UserName: FC = () => {
    const User = useUser().user;

    if (!User) {
        return <Loader />
    }

    return (
        <h2>
            {User?.username}
        </h2>
    );
};

export default UserName;
