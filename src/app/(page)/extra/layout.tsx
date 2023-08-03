export default function ExtraFieldLayout({ children }: { children: React.ReactNode }) {
    return <>
        <h1 className="text-blue-main text-4xl">Extra</h1>
        <div>
            {children}
        </div>
    </>
}