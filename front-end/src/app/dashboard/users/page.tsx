'use client'

import { Button } from '@/components/ui/button';
import { Sheet } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import * as XLSX from 'xlsx';
import OpenMobileSidebar from '@/components/openMobileSidebar';
import { useSidebar } from '@/components/ui/sidebar';
import DataTable from '@/components/dataTable';
import RegisterUser from '@/components/users/registerUser';
import EditUser from '@/components/users/editUser';
import DeleteUser from '@/components/users/deleteUser';

type User = {
    id: number
    name: string
    role: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Nome',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'role',
        header: 'Cargo',
        cell: ({ row }) => {
            const role = String(row.getValue('role'))

            return <p className={`${role === 'ADMINISTRATOR' ? ('bg-green-500') : ('bg-blue-500')} rounded-md px-2 py-1 text-white w-fit`}>{role === 'ADMINISTRATOR' ? ('Administrador') : ('Analista')}</p>
        }
    },
    {
        accessorKey: 'actions',
        header: 'Ações',
        cell: ({ row }) => {
            return (
            <div className='flex justify-start items-center gap-2'>
                <EditUser id={row.getValue('id')} name={row.getValue('name')} role={row.getValue('role')}/>
                
                <DeleteUser id={row.getValue('id')}/>
            </div>
            )
        }
    },
]

export default function DashboardUser() {

    const [users, setUsers] = useState<User[]>([])

    const [search, setSearch] = useState('')

    const [searchUsers, setSearchUsers] = useState<User[]>([])

    const [searchType, setSearchType] = useState('name')

    const [screenWidth, setScreenWidth] = useState(1000)

    const { setOpen } = useSidebar()

    async function getUsers() {
        const token = Cookies.get('session') as string;

        try {
            await api.get('/user', {
                headers: {
                    'Authorization': token,
                }
            }).then(response => {setUsers(response.data.result), setSearchUsers(response.data.result)})
        } catch(error) {
            toast(`Erro ${error}`)
        }
    }

    function generateSheet() {
        const ws = XLSX.utils.json_to_sheet(searchUsers);

        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'users')

        XLSX.writeFile(wb, 'planilha.xlsx')
    }

    async function Sidebar() {
        const updateWidth = () => {
            const width = window.innerWidth
            setScreenWidth(width)
        }

        window.addEventListener('resize', updateWidth)

        if (screenWidth <= 947) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        Sidebar()
    }, [screenWidth])

    useEffect(() => {
        switch (searchType) {
            case 'name':
                setSearchUsers(users.filter((infos:User) => infos.name.toLowerCase().includes(search.toLowerCase())))
                break;
            
            case 'role':
                setSearchUsers(users.filter((infos:User) => infos.role.toLowerCase().includes(search.toLowerCase())))
                break

        }
    }, [search])

    return(
        <div className='flex flex-col justify-start items-start h-screen p-10'>
            <OpenMobileSidebar/>
            
            <h1 className='text-2xl font-bold mb-2'>Usuários</h1>
            <div className='flex gap-1'>
                <RegisterUser/>

                <Button variant='outline' className='font-semibold' onClick={generateSheet}> <Sheet/> Gerar planilha</Button>
            </div>

            <div className='flex justify-start items-center w-full gap-2 mt-5'>
                <Input className='h-12' type='search' placeholder='Pesquisar' onChange={(event) => setSearch(event.target.value)} value={search} />

                <Select onValueChange={(value) => setSearchType(value)} defaultValue='name'>
                    <SelectTrigger className='bg-blue-500 text-white flex justify-between items-center w-32 h-12'>
                        <SelectValue placeholder='Tipo'/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem className='p-2 pl-7' value='name'>Nome</SelectItem>
                        <SelectItem className='p-2 pl-7' value='role'>Cargo</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='w-full h-full mt-5'>
                <DataTable columns={columns} data={searchUsers} />
            </div>
        </div>
    )
}