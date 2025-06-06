import { DynamicIcon } from "@/components/atoms/DynamicIcon";
import type { ISidebarData } from "@/Constants/SidebarData";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/Tooltip";

export default function SidebarItem({ item }: { item: ISidebarData }) {
  const navigate = useNavigate();

  const location = useLocation().pathname;

  const { title, path, icon, description } = item;

  const handleClick = () => {
    void navigate({ to: `/${path}` });
  };

  return (
    <li className="list-none">
      <div className="flex items-center gap-2 cursor-pointer">
        <DynamicIcon
          sx={{ color: `${location === path ? "white" : "white"}` }}
          iconName={icon}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={handleClick}
              className={`${location === path ? "text-white font-bold" : "text-white"} text-xl cursor-pointer`}
            >
              {title}
            </TooltipTrigger>
            <TooltipContent
              hidden={location === path}
              side="right"
              sideOffset={16}
              align="end"
              className="bg-white text-black"
            >
              {description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </li>
  );
}
