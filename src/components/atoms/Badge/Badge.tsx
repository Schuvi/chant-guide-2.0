import { cn } from "@/lib/utils";
import type React from "react";

export default function Badge({content, className, onClick} : {content: React.ReactNode, className?: string, onClick?: () => void}) {
    const handleClick = async () => {
        await onClick?.()
    }

    return (
        <button className={cn("w-max px-5 py-2 rounded-lg border-2 text-white cursor-pointer", className)} type="button" onClick={handleClick}>
            {content}
        </button>
    )
}