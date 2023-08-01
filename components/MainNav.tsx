"use client";

import {FC, useMemo} from "react";
import {cn} from "@/lib/utils";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";

interface MainNavProps {
    className: string;
}

const MainNav: FC<MainNavProps> = ({className, ...props}) => {
    const pathname: string = usePathname();
    const params = useParams();
    const routes: {href: string, label: string, active: boolean}[] = useMemo(() => [
        {
            href: `/${params.storeId}`,
            label: "Overview",
            active: pathname === `/${params.storeId}`,
        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboards",
            active: pathname === `/${params.storeId}/billboards`,
        },
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`,
        },
    ], [pathname, params]);

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map(link => (
                <Link href={link.href} key={link.href}
                      className={cn("text-sm font-medium transition-colors hover:text-primary",
                          link.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                    {link.label}
                </Link>
            ))}
        </nav>
    );
};

export default MainNav;
