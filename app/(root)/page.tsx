"use client";

import {NextPage} from "next";
import {UserButton} from "@clerk/nextjs";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useEffect} from "react";

const SetupPage: NextPage = () => {
    const onOpen = useStoreModal(s => s.onOpen);
    const isOpen = useStoreModal(s => s.isOpen);

    useEffect(() => {
        if (!isOpen) {
            onOpen();
        }

    }, [isOpen, onOpen]);

    return (
        <div className="p-4">
            <h1>Root</h1>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
};

export default SetupPage;
