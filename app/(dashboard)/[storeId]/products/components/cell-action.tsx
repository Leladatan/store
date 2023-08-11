"use client";

import {FC, useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, Trash} from "lucide-react";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";
import {ProductColumn} from "@/app/(dashboard)/[storeId]/products/components/columns";

interface CellActionProps {
    data: ProductColumn;
}

const CellAction: FC<CellActionProps> = ({data}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const params = useParams();

    const onCopy = (id: string): void => {
        navigator.clipboard.writeText(id);
        toast.success("Product id copied to the clipboard.");
    };

    const onDelete = async (): Promise<void> => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${data.id}`);
            router.refresh();
            toast.success("Product deleted.");
        } catch (e) {
            toast.error("Make sure you removed this product first.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
      <>
          <AlertModal isOpen={open} onClose={() => setOpen(false)} loading={loading} onConfirm={onDelete} />
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                      Actions
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Update
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCopy(data.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Id
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setOpen(true)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
      </>
    );
};

export default CellAction;