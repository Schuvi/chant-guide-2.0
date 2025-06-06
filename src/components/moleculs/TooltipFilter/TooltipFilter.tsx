import { Popover, PopoverContent, PopoverTrigger } from "@/components/atoms/Popover";
import type { ReactNode } from "react";

export default function TooltipFilter({trigger} : {trigger: ReactNode}) {
    return (
        <Popover>
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <PopoverContent>
                
            </PopoverContent>
        </Popover>
    )
}