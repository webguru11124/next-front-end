export default function ForwardersLayout({ children }: { children: React.ReactNode }) {
    return <>
        <h1 className="text-blue-main text-4xl">Forwarders</h1>
        <div>
            {children}
        </div>
    </>
}