

import ActiveLink from "@/components/ActiveLink";

export default function NavItem({ name, url, icon, sub = false }: { sub?: boolean, icon: React.ReactNode, name: string, url: string }) {
    const content = (<div className="flex items-center px-2.5 py-3.5">{icon} <span className="ml-2">{name}</span></div>)
    return <div className={` flex mx-5  text-blue-main  ${sub ? "text-lg" : "text-xl"}`}>
        <ActiveLink activeClassName={`bg-blue-lighter   rounded-sm ${sub ? "border-b-6" : "border-b-8"}`} href={url} className={`grow flex items-center border-b-blue-main`} >
            {content}
        </ActiveLink>
    </div>
}