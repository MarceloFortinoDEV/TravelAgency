'use client'

import { ChevronsUpDown, HouseIcon, LogOutIcon, Pen, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface userData {
    id: number,
    name: string
    email: string
    role: string
}

export function AppSidebar() {

    const pathname = usePathname()

    const router = useRouter()

    const [userData, setUserData] = useState<userData>()

    const { state, open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar()

    useEffect(() => {
        const token = Cookies.get('session') as string;

        if (token) {
            try {
                const decodedToken = jwt.decode(token) as userData;

                setUserData(decodedToken)
            } catch (error) {
                throw error;
            }
        }
    }, [])

    async function userLogout() {
        Cookies.remove('session');

        router.push('/login')
    }

    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className='text-3xl text-center text-gray-950 font-extrabold mb-5 mt-5'>Travel<span className='text-blue-500'>Agency</span></h1>
                <hr className='mx-5 rounded-full h-2 border-blue-500 border-solid border-2 bg-blue-500' />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem className='flex flex-col gap-1'>
                                <SidebarMenuButton className={`h-10 text-gray-950 ${!pathname.includes('users') && ('bg-blue-500 hover:bg-blue-600 text-white hover:text-white')}`} asChild>
                                    <a href='/dashboard' className='flex justify-start items-center gap-2'>
                                        <HouseIcon className='size-4' />
                                        Agências
                                    </a>
                                </SidebarMenuButton>

                                <SidebarMenuButton className={`h-10 text-gray-950 ${pathname.includes('users') && ('bg-blue-500 hover:bg-blue-600 text-white hover:text-white')}`} asChild>
                                    <a href='/dashboard/users' className='flex justify-start items-center gap-2'>
                                        <Users className='size-4' />
                                        Usuários
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className='h-10'>
                            <Avatar>
                                <AvatarFallback className='border-2 border-solid border-blue-500'>{userData?.name.split(' ').map(name => name.charAt(0)).join('')}</AvatarFallback>
                            </Avatar>
                            {userData ? (<div className='flex w-full justify-between items-center'>
                                <p>{userData?.name}</p>
                                <ChevronsUpDown className='text-gray-500' />
                            </div>) : (<Skeleton className='h-5 w-full' />)}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Pen />
                            Editar perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={userLogout} className='text-red-500'>
                            <LogOutIcon />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    )
}