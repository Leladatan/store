"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {Store} from "@prisma/client";
import {FC, useState} from "react";
import {useStoreModal} from "@/hooks/use-store-modal";
import {useParams, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown, PlusCircle, StoreIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList, CommandSeparator
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
}

const StoreSwitcher: FC<StoreSwitcherProps> = (
    {
        className,
        items = []
    }
) => {
    const [open, setOpen] = useState<boolean>(false);
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map(item => ({
        label: item.name,
        id: item.id
    }));

    const currentStore = formattedItems.find(item => item.id === params.storeId);

    const onStoreSelect = (store: {id: string, label: string}): void => {
        setOpen(false);
        router.push(`/${store.id}`);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..."/>
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map(store => (
                                <CommandItem
                                    key={store.id}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4" />
                                    {store.label}
                                    <Check className={cn("ml-auto h-4 w-4",
                                        currentStore?.id === store.id ? "opacity-100" : "opacity-0" )}/>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandGroup>
                        <CommandItem
                            onSelect={(): void => {
                                setOpen(false);
                                storeModal.onOpen();
                            }}
                        >
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create store
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default StoreSwitcher;