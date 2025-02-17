'use client'

import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@/services/api';
import { toast } from 'sonner';
import EditAgency from '@/components/agency/editAgency';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import TextClipboard from '@/components/textClipboard';
import DeleteAgency from '@/components/agency/deleteAgency';
import OpenMobileSidebar from '@/components/openMobileSidebar';

type Agency = {
    id: string
    name: string
    cnpj: string
    socialName: string
    stateRegister: string
    cnpjStatus: string
    foundationDate: string
}

export default function DashboardDetails() {

    const router = useRouter()

    const params = useParams()

    const [agency, setAgency] = useState<Agency>()

    const id = params.id as string;

    const cnpj = agency?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')

    const stateRegister = agency?.stateRegister.match(/.{1,3}/g)?.join('.')

    async function getAgency() {
        const token = Cookies.get('session') as string;

        try {
            await api.get(`/agency/details/${id}`, {
                headers: {
                    'Authorization': token,
                }
            }).then(response => setAgency(response.data.result[0]))
        } catch (error) {
            toast(`Erro ${error}`)
        }
    }

    useEffect(() => {
        getAgency();
    }, [])

    return (
        <div className='flex flex-col justify-start items-start h-screen p-10'>
            <OpenMobileSidebar/>

            <div className='w-full h-full mt-5'>
                
                <ArrowLeft className='cursor-pointer min-h-9 min-w-10 rounded-md mb-2 text-blue-500 hover:bg-gray-200 hover:p-1 transition-all' onClick={() => router.push('/dashboard')} />
                    
                <div className='flex justify-start items-center gap-2 max-[1115px]:flex-col max-[1115px]:items-start'>
                    
                    <div className='text-2xl font-bold flex gap-2 max-[980px]:flex-col'>
                        <h1 className='flex gap-2'>Agência:</h1>
                        {agency ? <p className='text-blue-500 flex gap-2'>{agency.name}</p> : <Skeleton className='h-8 w-full' />}
                    </div>
                    
                    <div className='flex gap-2 mb-2'>
                        {agency ? <p className='bg-blue-500 font-semibold text-md w-fit p-2 text-white rounded-md'>ID: {agency?.id}</p> : <Skeleton className='h-10 w-52' />}
                        <p className={`${agency?.cnpjStatus.toLowerCase() === 'ativa' ? 'bg-green-500' : 'bg-red-500'} font-semibold w-fit p-2 text-white rounded-md`}>{agency?.cnpjStatus}</p>
                    </div>
                </div>

                <h1 className='text-xl mb-2'>Editar agência</h1>

                {agency ? (
                    <div className='flex gap-1 mb-3'>
                        <EditAgency id={agency?.id} cnpj={agency?.cnpj} name={agency?.name} socialName={agency?.socialName} cnpjStatus={agency?.cnpjStatus} stateRegister={agency?.stateRegister} foundationDate={agency?.foundationDate ? new Date(agency.foundationDate) : new Date()} />

                        <DeleteAgency id={agency?.id}/>
                    </div>
                ) : (
                    <Skeleton className='h-10 w-52'/>
                )}

                <div className='grid grid-cols-2 gap-2 max-[930px]:grid-cols-1'>
                    <div>
                        <p>CNPJ:</p>
                        <TextClipboard>{cnpj}</TextClipboard>
                    </div>

                    <div>
                        <p>Razão social:</p>
                        <TextClipboard className='font-semibold w-fit p-2 text-white rounded-md'>{agency?.socialName}</TextClipboard>
                    </div>

                    <div>
                        <p>Inscrição estadual:</p>
                        <TextClipboard className='font-semibold w-fit p-2 text-white rounded-md'>{stateRegister}</TextClipboard>
                    </div>

                    <div>
                        <p>Nome fantasia:</p>
                        <TextClipboard className='font-semibold w-fit p-2 text-white rounded-md'>{agency?.name}</TextClipboard>
                    </div>

                    <div className='pb-5'>
                        <p>Data da fundação:</p>
                        <TextClipboard className='font-semibold w-fit p-2 text-white rounded-md'>{agency && new Date(agency?.foundationDate).toLocaleDateString('pt-br')}</TextClipboard>
                    </div>
                </div>

            </div>
        </div>
    )
}