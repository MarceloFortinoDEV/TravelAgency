'use client'

import AgencyTable from '@/components/dataTable';
import RegisterAgency from '@/components/agency/registerAgency';
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

type Agency = {
    id: number
    name: string
    cnpj: string
    socialName: string
    stateRegister: string
    cnpjStatus: string
    foundationDate: string
}

export const columns: ColumnDef<Agency>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Nome fantasia',
    },
    {
        accessorKey: 'cnpj',
        header: 'CNPJ',
        cell: ({ row }) => {
            const cnpj = String(row.getValue('cnpj'))
    
            return <div>{cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')}</div>
        },
    },
    {
        accessorKey: 'stateRegister',
        header: 'Inscrição estadual',
        cell: ({ row }) => {
            const stateRegister = String(row.getValue('stateRegister'))
    
            return <div>{stateRegister.match(/.{1,3}/g)?.join('.') || ''}</div>
        },
    },
    {
        accessorKey: 'cnpjStatus',
        header: 'Status do CNPJ',
        cell: ({ row }) => {
            const cnpjStatus = String(row.getValue('cnpjStatus'))

            return <p className={`${cnpjStatus === 'ATIVA' ? ('bg-green-500') : ('bg-red-500')} rounded-md px-2 py-1 text-white w-fit`}>{cnpjStatus}</p>
        }
    },
    {
        accessorKey: 'foundationDate',
        header: 'Data de fundação',
        cell: ({ row }) => {
            const foundationDate = new Date(row.getValue('foundationDate'))
    
            return <div>{foundationDate.toLocaleDateString('pt-br')}</div>
        },
    },

]

export default function Dashboard() {

    const [agency, setAgency] = useState<Agency[]>([])

    const [search, setSearch] = useState('')

    const [searchAgency, setSearchAgency] = useState<Agency[]>([])

    const [searchType, setSearchType] = useState('name')

    const [screenWidth, setScreenWidth] = useState(1000)

    const { setOpen } = useSidebar()

    async function getAgency() {
        const token = Cookies.get('session') as string;

        try {
            await api.get('/agency', {
                headers: {
                    'Authorization': token,
                }
            }).then(response => {setAgency(response.data.result), setSearchAgency(response.data.result)})
        } catch(error) {
            toast(`Erro ${error}`)
        }
    }

    function generateSheet() {
        const ws = XLSX.utils.json_to_sheet(searchAgency);

        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'agências')

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
        getAgency();
    }, [])

    useEffect(() => {
        Sidebar()
    }, [screenWidth])

    useEffect(() => {
        switch (searchType) {
            case 'name':
                setSearchAgency(agency.filter((infos:Agency) => infos.name.toLowerCase().includes(search.toLowerCase())))
                break;
            
            case 'cnpj':
                setSearchAgency(agency.filter((infos:Agency) => infos.cnpj.toLowerCase().includes(search.toLowerCase())))
                break

            case 'stateRegister':
                setSearchAgency(agency.filter((infos:Agency) => infos.stateRegister.toLowerCase().includes(search.toLowerCase())))
                break
            
            case 'cnpjStatus':
                setSearchAgency(agency.filter((infos:Agency) => infos.cnpjStatus.toLowerCase().includes(search.toLowerCase())))
                break

            case 'foundationDate':
                setSearchAgency(agency.filter((infos:Agency) => new Date(infos.foundationDate).toLocaleDateString('pt-br').includes(search)))
                break

        }
    }, [search])

    return(
        <div className='flex flex-col justify-start items-start h-screen p-10'>
            <OpenMobileSidebar/>
            
            <h1 className='text-2xl font-bold mb-2'>Agências</h1>
            <div className='flex gap-1'>
                <RegisterAgency/>

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
                        <SelectItem className='p-2 pl-7' value='cnpj'>CNPJ</SelectItem>
                        <SelectItem className='p-2 pl-7' value='stateRegister'>Inscrição estadual</SelectItem>
                        <SelectItem className='p-2 pl-7' value='cnpjStatus'>Status do CNPJ</SelectItem>
                        <SelectItem className='p-2 pl-7' value='foundationDate'>Data de fundação</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className='w-full h-full mt-5'>
                <AgencyTable columns={columns} data={searchAgency} redirect='/dashboard/details/' />
            </div>
        </div>
    )
}