export default function CustomersLayout({ children }: { children: React.ReactNode }) {
    return <>
        <h1 className="text-blue-main text-4xl">Customer</h1>
        <div>
            {children}
        </div>
    </>
}