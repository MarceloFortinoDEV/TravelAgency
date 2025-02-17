'use client'

import { Edit, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from 'zod'
import { api } from "@/services/api";

import Cookies from 'js-cookie'
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

interface Props {
    id: string
    cnpj: string
    name: string
    socialName: string
    stateRegister: string
    cnpjStatus: string
    foundationDate: Date
}

const registerAgencySchema = z.object({
    cnpj: z.string().length(14, 'O CNPJ precisa ter 14 caracteres.'),
    name: z.string().min(2, 'O nome do CNPJ precisa ter no mínimo 2 caracteres').max(200, 'O nome do CNPJ precisa ter no máximo 200 caracteres.'),
    socialName: z.string().min(2, 'A razão social precisa ter no mínimo 2 caracteres.').max(200, 'A razão social precisa ter no máximo 200 caractéres.'),
    stateRegister: z.string().min(8, 'O Inscrição estadual precisa ter pelo menos 8 caracteres.').max(12, 'O Inscrição estadual precisa ter no máximo 12 caracteres.'),
    cnpjStatus: z.string().min(1, 'Selecione o status do CNPJ'),
    foundationDate: z.string().date().min(1, 'Selecione uma data'),
})

type RegisterAgencySchema = z.infer<typeof registerAgencySchema>

export default function EditAgency({ id, cnpj, name, socialName, stateRegister, cnpjStatus, foundationDate }:Props) {

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterAgencySchema>({
        resolver: zodResolver(registerAgencySchema),
        defaultValues: {
            cnpj: cnpj,
            name: name,
            socialName: socialName,
            stateRegister: stateRegister,
            cnpjStatus: cnpjStatus,
            foundationDate: new Date(foundationDate.toLocaleDateString('en-CA') + 'T00:00:00.000Z').toISOString().split('T')[0],
        }
    })

    async function updateAgency(data: RegisterAgencySchema) {

        const token = Cookies.get('session') as string;

        try {
            await api.put('/agency/update', {
                id: id,
                cnpj: data.cnpj,
                name: data.name,
                socialName: data.socialName,
                stateRegister: data.stateRegister,
                cnpjStatus: data.cnpjStatus,
                foundationDate: data.foundationDate
            }, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            }
            )

            location.reload()
        } catch (error) {
            toast(`Erro ao editar agência. ${error instanceof Error && error.message}`)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-blue-500 hover:bg-blue-600 font-semibold'> <Edit/> Editar</Button>
            </DialogTrigger>
            <DialogContent className='w-full max-w-screen-md'>
                <DialogHeader>
                    <DialogTitle>Editar agência</DialogTitle>
                    <DialogDescription>Modifique os dados abaixo para editar os dados da agência.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(updateAgency)}>
                    <div className='grid grid-cols-2 gap-5 mb-5'>
                        <div>
                            <h1 className='font-semibold text-sm mb-1'>CNPJ</h1>
                            <Input type='number' placeholder='Digite o número do CNPJ' {...register('cnpj')} onChange={(event) => { setValue('cnpj', event.target.value, { shouldValidate: true }) }} />

                            {errors.cnpj && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.cnpj.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Nome fantasia</h1>
                            <Input type='text' placeholder='Digite o nome fantasia da empresa' {...register('name')} onChange={(event) => setValue('name', event.target.value, { shouldValidate: true })} value={watch('name')} />

                            {errors.name && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Razão social</h1>
                            <Input type='text' placeholder='Digite a razão social' {...register('socialName')} onChange={(event) => setValue('socialName', event.target.value, { shouldValidate: true })} value={watch('socialName')} />

                            {errors.socialName && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.socialName.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Inscrição estadual</h1>
                            <Input type='number' placeholder='Digite o número do Inscrição estadual' {...register('stateRegister')} />

                            {errors.stateRegister && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.stateRegister.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Situação cadastral</h1>
                            <Select onValueChange={(value) => setValue('cnpjStatus', value, { shouldValidate: true })} value={watch('cnpjStatus')} {...register('cnpjStatus')}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Selecione o status do CNPJ' />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value='ATIVA'>Ativa</SelectItem>
                                    <SelectItem value='SUSPENSA'>Suspensa</SelectItem>
                                    <SelectItem value='INAPTA'>Inapta</SelectItem>
                                    <SelectItem value='BAIXADA'>Baixada</SelectItem>
                                    <SelectItem value='CANCELADA'>Cancelada</SelectItem>
                                    <SelectItem value='PENDREGULARIZATION'>Pend. Regularização</SelectItem>
                                </SelectContent>
                            </Select>

                            {errors.cnpjStatus && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.cnpjStatus.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Data da fundação</h1>
                            <Input type='date' {...register('foundationDate')} onChange={(event) => setValue('foundationDate', event.target.value, { shouldValidate: true })} value={watch('foundationDate') ?? null} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant='outline'>Cancelar</Button>
                        </DialogClose>

                        <Button type='submit'>Editar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            <Toaster />
        </Dialog>
    )
}