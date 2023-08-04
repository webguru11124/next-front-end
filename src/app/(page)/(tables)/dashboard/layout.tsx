export default function DashboardsLayout({ children }: { children: React.ReactNode }) {
    return <>
        <h1 className="text-blue-main text-4xl">Dashboard</h1>
        <div>
            {children}
        </div>
    </>
}