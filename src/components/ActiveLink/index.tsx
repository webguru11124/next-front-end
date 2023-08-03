"use client"
import { usePathname, useRouter } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import React, { PropsWithChildren, useState, useEffect } from 'react'
import path from 'path'

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

    useEffect(() => {
        // Check if the router fields are updated client-side
        // Dynamic route will be matched via props.as
        // Static route will be matched via props.href
        const linkPathname = new URL(
            (props.as || props.href) as string,
            location.href
        ).pathname;



        const newClassName =
            linkPathname === pathname
                ? `${className} ${activeClassName}`.trim()
                : className

        if (newClassName !== computedClassName) {
            setComputedClassName(newClassName)
        }
    }, [
        pathname,
        props.as,
        props.href,
        activeClassName,
        className,
        computedClassName,
    ])

    return (
        <Link className={computedClassName} {...props}>
            {children}
        </Link>
    )
}

export default ActiveLink