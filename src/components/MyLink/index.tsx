import Link, { LinkProps } from "next/link";
import { forwardRef, ReactNode } from "react";

interface ILinkComp extends LinkProps {
  className: string;
  children: ReactNode;
}

export const MyLink = forwardRef<HTMLAnchorElement, ILinkComp>((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href} passHref>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

MyLink.displayName = "MyLink";
