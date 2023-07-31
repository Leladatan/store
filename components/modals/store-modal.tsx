"use client";

import {type FC} from 'react';
import Modal from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-modal";

const StoreModal: FC = () => {
    const storeModal = useStoreModal();

    return (
        <Modal
            title="Create Store"
            description="Add a new sotre to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future Create Sotre Form
        </Modal>
    );
};

export default StoreModal;
