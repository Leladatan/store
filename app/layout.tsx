import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {ClerkProvider} from "@clerk/nextjs";
import {ModalProvider} from "@/providers/modal-provider";
import {ToastProvider} from "@/providers/toast-provider";
import ThemesProvider from "@/providers/themes-provider";
import {NextFont} from "next/dist/compiled/@next/font";
import {cn} from "@/lib/utils";

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Store E-COM',
  description: 'Store E-COM desc',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en">
        <body className={cn("transition-colors", inter.className)}>
        <ThemesProvider>
            <ToastProvider />
            <ModalProvider />
            {children}
        </ThemesProvider>
        </body>
        </html>
    </ClerkProvider>
  )
};
