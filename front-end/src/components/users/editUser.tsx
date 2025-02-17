'use client'

import { Edit, EyeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { z } from 'zod';
import { api } from "@/services/api";

import Cookies from 'js-cookie';
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

interface Props {
    id: string
    name: string
    role: string
}

const editFormSchema = z.object({
    name: z.string().min(3, 'É necessário ter no minímo 3 letras.').max(100, 'O nome não pode ter mais de 100 letras.'),
    role: z.string().min(4, 'É necessário selecionar um cargo.')
})

type EditFormSchema = z.infer<typeof editFormSchema>

export default function EditUser({ id, name, role }:Props) {

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<EditFormSchema>({
        resolver: zodResolver(editFormSchema),
        defaultValues: {
            name: name,
            role: role,
        }
    })

    async function editUser(data: EditFormSchema) {

        const token = Cookies.get('session') as string;

        try {
            await api.put('/user/update', {
                id: id,
                name: data.name, 
                role: data.role,
            },
            {
                headers: {
                    'Authorization': token
                }
            });

            location.reload()
        } catch (error) {
            toast(`Erro ao editar usuário. ${error}`)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-blue-500 hover:bg-blue-600'><Edit/> Editar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar usuário</DialogTitle>
                    <DialogDescription>Modifique os dados abaixo para editar um usuário.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(editUser)}>
                    <div className='flex flex-col gap-5 mb-5'>
                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Nome</h1>
                            <Input type='text' placeholder='Digite o nome' {...register('name')} onChange={(event) => { setValue('name', event.target.value, { shouldValidate: true }) }} />

                            {errors.name && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Cargo</h1>
                            <Select onValueChange={(value) => setValue('role', value, { shouldValidate: true })} value={watch('role')} {...register('role')}>
                                <SelectTrigger>
                                    <SelectValue placeholder='Selecione o cargo' />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value='ANALIST'>Analista</SelectItem>
                                    <SelectItem value='ADMINISTRATOR'>Administrador</SelectItem>
                                </SelectContent>
                            </Select>

                            {errors.role && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.role.message}</p>
                            )}
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