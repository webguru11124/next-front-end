import { FiChevronLeft } from "react-icons/fi"
export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section className="">
        <button className="flex items-center text-blue-primary">
            <FiChevronLeft size={46} />
            <span className="text-xl">Go Back</span>
        </button>
        <h1 className="text-blue-main text-3xl font-bold mt-5 ">Manage Profile</h1>
        <div className="flex justify-center mt-20">
            {children}
        </div>
    </section>
}