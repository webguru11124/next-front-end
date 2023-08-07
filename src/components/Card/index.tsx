
import { cx } from "@emotion/css";

const CardWidth = {
    md: '475px',
    lg: '920px',
    xl: '630px',
};


export default function Card({ size, children }: { size: keyof typeof CardWidth, children: React.ReactNode }) {
    // 'keyof typeof AvatarSize' ensures the 'size' prop can only be one of the keys (sm, md, lg) of the AvatarSize enum.

    // Access the actual size value using the size prop.
    const width = CardWidth[size];

    return (
        <div className={cx(`rounded-md bg-white shadow-lg  w-[${width}] `, { "p-7": size === "md", "py-9 px-12": size === "lg" })}>
            {children}
        </div>
    );
}
