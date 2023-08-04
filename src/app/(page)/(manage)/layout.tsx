import Header from "@/app/(page)/(manage)/header";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
    return <>
        <div className="mx-20 my-10">
            <div>
                <Header></Header>
            </div>
            {children}
        </div>
    </>
}