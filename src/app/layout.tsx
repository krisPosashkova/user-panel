import type { Metadata } from "next";
import { Inter, Zen_Dots } from "next/font/google";
import AppThemeProvider from "@/providers/AppThemeProvider";

const inter = Inter({
    weight: ["400", "600"],
    subsets: ["latin"],
    variable: "--font-primary",
    display: "swap",
});

const zen_dots = Zen_Dots({
    weight: ["400"],
    subsets: ["latin"],
    variable: "--font-secondary",
    display: "swap",
});

export const metadata: Metadata = {
    title: "User Panel",
    description: "User Panel by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${zen_dots.variable}`}>
            <body>
                <AppThemeProvider>{children}</AppThemeProvider>
            </body>
        </html>
    );
}
