"use client";

import {FC, useEffect, useState} from "react";
import Modal from "@/components/ui/modal";
import {Button} from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    loading: boolean;
}

const AlertModal: FC<AlertModalProps> = ({isOpen, loading, onClose, onConfirm}) => {
    const [isMounted, setIsMounted] = useState<boolean>();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                description="This action cannot be undone."
                title="Are you sure?"
            >
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={loading} variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                        Continue
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default AlertModal;
