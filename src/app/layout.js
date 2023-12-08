import { Inter } from "next/font/google";
import "./globals.sass";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Subs",
    description: "Manage your subscribitions",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@200;500;300;600;700&display=swap"
                    rel="stylesheet"
                />

                <link
                    href="https://fonts.googleapis.com/css2?family=Oswald:wght@300&family=Roboto:wght@300;500&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
