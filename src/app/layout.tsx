import Header from "@/app/Header"
import "@/globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-gray-white ">
                <Header />
                <div className="px-20 pt-10 ">
                    {children}
                </div>
            </body>
        </html>
    )
}