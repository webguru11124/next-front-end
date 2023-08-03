import Link from "next/link";

export default function NavItem({ name, url, icon }: { icon: React.ReactNode, name: string, url: string }) {
    return <div className="my-3.5 flex ml-7">
        <Link href={url} className="flex items-center text-blue-main text-xl">
            {icon} <span className="ml-2">{name}</span>
        </Link>
    </div>
}