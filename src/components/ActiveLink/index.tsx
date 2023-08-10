"use client"
import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren, useState } from 'react'

type ActiveLinkProps = LinkProps & {
    className?: string
    activeClassName: string
}

const ActiveLink = ({
    children,
    activeClassName,
    className,
    ...props
}: PropsWithChildren<ActiveLinkProps>) => {
    const pathname = usePathname();
    const [computedClassName, setComputedClassName] = useState(className)

    // Check if the router fields are updated client-side
    // Dynamic route will be matched via props.as
    // Static route will be matched via props.href
    const linkPathname = (props.as || props.href) as string;

    const newClassName =
        linkPathname === pathname
            ? `${className} ${activeClassName}`.trim()
            : className

    if (newClassName !== computedClassName) {
        setComputedClassName(newClassName)
    }

    return (
        <Link className={computedClassName} {...props}>
            {children}
        </Link>
    )
}

export default ActiveLink