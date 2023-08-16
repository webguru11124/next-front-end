
import { cx } from "@emotion/css";

const CardWidth = {
    md: '475px',
    lg: '920px',
    xl: '630px',
    fl: 'full'
};


export default function Card({ size, children }: { size: keyof typeof CardWidth, children: React.ReactNode }) {
    // 'keyof typeof AvatarSize' ensures the 'size' prop can only be one of the keys (sm, md, lg) of the AvatarSize enum.

    // Access the actual size value using the size prop.
    const width = CardWidth[size];
    const width_style = width != "full" ? `w-[${width}]` : 'w-full'
    const padding = size === "md" ? "p-7" : (size === "lg" ? "py-9 px-12" : "p-4");
    return (
        <div className={`rounded-md bg-white shadow-lg  ${width_style} ${padding}  w-full`}>
            {children}
        </div>
    );
}
