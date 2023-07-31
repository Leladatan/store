"use client";

import {NextPage} from "next";
import {UserButton} from "@clerk/nextjs";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useEffect} from "react";

const SetupPage: NextPage = () => {
    const onOpen = useStoreModal(s => s.onOpen);
    const isOpen = useStoreModal(s => s.isOpen);

    useEffect((): void => {
        if (!isOpen) {
            onOpen();
        }

    }, [isOpen, onOpen]);

    return (
        <>
        </>
    )
};

export default SetupPage;
