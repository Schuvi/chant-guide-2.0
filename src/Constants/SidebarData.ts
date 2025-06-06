import type { IconName } from "@/components/atoms/DynamicIcon/DynamicIcon";

export interface ISidebarData {
    title: string;
    path: string;
    icon: IconName;
    description: string;
}

export const SidebarData: ISidebarData[] = [
    {
        title: 'Home',
        path: '/',
        icon: 'Home',
        description: 'Go to the home page',
    },
    {
        title: 'New Chant',
        path: '/new-chant',
        icon: 'Add',
        description: 'Create a new chant',
    }
]