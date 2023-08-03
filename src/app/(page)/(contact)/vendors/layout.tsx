export default function VendorsLayout({ children }: { children: React.ReactNode }) {
    return <>
        <h1 className="text-blue-main text-4xl">Vendors</h1>
        <div>
            {children}
        </div>
    </>
}