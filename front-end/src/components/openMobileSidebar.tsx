'use client'

import { Menu } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

export default function OpenMobileSidebar() {

    const { state, setOpenMobile } = useSidebar()

    return(
        <Menu className={`max-[767px]:block ${state === 'collapsed' ? ('block') : ('hidden')} cursor-pointer min-h-9 min-w-10 rounded-md mb-2 text-blue-500 hover:bg-gray-200 hover:p-1 transition-all`} size={10} onClick={() => setOpenMobile(true)}/>
    )
}