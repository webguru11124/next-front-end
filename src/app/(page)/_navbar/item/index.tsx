

import ActiveLink from "@/components/ActiveLink";

export default function NavItem({ name, url, icon, sub = false }: { sub?: boolean, icon: React.ReactNode, name: string, url: string }) {
    const content = (<div className="flex items-center">{icon} <span className="ml-2">{name}</span></div>)
    return <div className={`flex my-3.5  mx-7  text-blue-main ${sub ? "text-lg" : "text-xl"}`}>
        <ActiveLink activeClassName="bg-blue-lighter" href={url} className={`flex items-center `} >
            {content}
        </ActiveLink>
    </div>
}