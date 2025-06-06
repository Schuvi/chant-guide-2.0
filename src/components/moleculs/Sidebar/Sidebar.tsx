import SidebarItem from "@/components/atoms/SidebarItem/SidebarItem"
import { SidebarData } from "@/Constants/SidebarData"
import { Link } from "@tanstack/react-router"

export default function Sidebar() {
    return (
        <nav className="bg-[#1e2124] p-4 w-72 h-screen border-r-3 border-white/30">
            <Link to="/" className="text-white font-bold text-2xl">Chant Guide 2.0</Link>

            <ul className="flex flex-col gap-3 mt-7">
                {SidebarData.map(item => (
                    <SidebarItem key={item.title} item={item} />
                ))}
            </ul>
        </nav>
    )
}