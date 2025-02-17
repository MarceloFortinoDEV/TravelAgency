'use client'

import { EyeIcon, Plus } from "lucide-react";
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

const registerFormSchema = z.object({
    name: z.string().min(3, 'É necessário ter no minímo 3 letras.').max(100, 'O nome não pode ter mais de 100 letras.'),
    email: z.string().email('Email inválido.').max(100, 'O email não pode ter mais que 100 caracteres.'),
    password: z.string().min(4, 'É necessário ter no mínimo 4 caracteres.'),
    role: z.string().min(4, 'É necessário selecionar um cargo.')
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

type PasswordButtonType = 'password' | 'text'

export default function RegisterUser() {

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: '',
        }
    })

    const [passwordType, setPasswordType] = useState<PasswordButtonType>('password')

    async function registerUser(data: RegisterFormSchema) {

        const token = Cookies.get('session') as string;

        try {
            await api.post('/user/create', {
                name: data.name, 
                email: data.email, 
                password: data.password, 
                role: data.role,
            },
            {
                headers: {
                    'Authorization': token
                }
            });

            location.reload()
        } catch (error) {
            toast(`Erro ao criar usuário. ${error instanceof Error && error.message} ${data.name} ${data.email} ${data.password} ${data.role}`)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-blue-500 hover:bg-blue-600 font-semibold'> <Plus /> Adicionar</Button>
            </DialogTrigger>
            <DialogContent className='w-full max-w-screen-md'>
                <DialogHeader>
                    <DialogTitle>Adicionar usuário</DialogTitle>
                    <DialogDescription>Preencha os dados abaixo para adicionar um novo usuário.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(registerUser)}>
                    <div className='grid grid-cols-2 gap-5 mb-5'>
                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Nome</h1>
                            <Input type='text' placeholder='Digite o nome' {...register('name')} onChange={(event) => { setValue('name', event.target.value, { shouldValidate: true }) }} />

                            {errors.name && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Email</h1>
                            <Input type='email' placeholder='Digite o email' {...register('email')} onChange={(event) => setValue('email', event.target.value, { shouldValidate: true })} value={watch('email')} />

                            {errors.email && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className='font-semibold text-sm mb-1'>Senha</h1>
                            <div className='flex gap-2'>
                                <Input type={passwordType} placeholder='Digite sua senha' {...register('password')} onChange={(event) => setValue('password', event.target.value, { shouldValidate: true })} value={watch('password')} />

                                <Button size='icon' type='button' className='bg-blue-500 hover:bg-blue-600 text-white hover:text-white' variant='outline' onClick={() => setPasswordType(passwordType === 'password' ? ("text") : ('password'))}>
                                    <EyeIcon/>
                                </Button>
                            </div>

                            {errors.password && (
                                <p className='text-red-500 mt-2 text-sm'>{errors.password.message}</p>
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

                        <Button type='submit'>Cadastrar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            <Toaster />
        </Dialog>
    )
}