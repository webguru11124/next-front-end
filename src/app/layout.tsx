
import "@/globals.css";
import { NextAuthProvider } from "@/app/providers";
import { ToastContainer } from "react-toastify";
export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-gray-white ">
                <NextAuthProvider>

                    {children}

                    <ToastContainer />
                </NextAuthProvider>

            </body>
        </html>
    )
}