'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/sonner"

import { toast } from "sonner"
import { api } from "@/services/api"
import { EyeIcon, LoaderCircle } from "lucide-react"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation"
import { useState } from "react"

const registerFormSchema = z.object({
    name: z.string().min(3, 'É necessário ter no minímo 3 letras.').max(100, 'O nome não pode ter mais de 100 letras.'),
    email: z.string().email('Email inválido.').max(100, 'O email não pode ter mais que 100 caracteres.'),
    password: z.string().min(4, 'É necessário ter no mínimo 4 caracteres.')
})

type RegisterFormSchema = z.infer<typeof registerFormSchema>

type PasswordButtonType = 'password' | 'text'

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
    })

    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const [passwordType, setPasswordType] = useState<PasswordButtonType>('password')

    async function userRegister(data: RegisterFormSchema) {
        
        setLoading(true);

        try {
            await api.post('/auth/register', { 
                name: data.name, 
                email: data.email, 
                password: data.password, 
            });

            router.push('/login');
        } catch(error) {
            toast(`Não foi possível realizar o cadastro.`)
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className='flex flex-col justify-center items-center h-screen bg-white'>
            <div className='w-80'>
                <h1 className='text-3xl text-center text-gray-950 font-extrabold mb-5'>Travel<span className='text-blue-500'>Agency</span></h1>
                <hr className='mb-5 rounded-full h-2 border-blue-500 border-solid border-2 bg-blue-500'/>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit(userRegister)}>
                    <div>
                        <h1 className='font-semibold text-gray-950'>Nome</h1>
                        <Input type='text' placeholder='Digite seu nome' {...register('name')} />

                        {errors.name?.message && (
                            <h1 className='font-semibold text-red-500'>{errors.name?.message}</h1>
                        )}
                    </div>
                    <div>
                        <h1 className='font-semibold text-gray-950'>Email</h1>
                        <Input type='email' placeholder='Digite seu email' {...register('email')} />

                        {errors.email?.message && (
                            <h1 className='font-semibold text-red-500'>{errors.email?.message}</h1>
                        )}
                    </div>
                    <div>
                        <h1 className='font-semibold text-gray-950'>Senha</h1>
                        <div className='flex gap-2'>
                            <Input type={passwordType} placeholder='Digite sua senha' {...register('password')} />
                            
                            <Button size='icon' type='button' className='bg-blue-500 hover:bg-blue-600 text-white hover:text-white' variant='outline' onClick={() => setPasswordType(passwordType === 'password' ? ("text") : ('password'))}>
                                <EyeIcon/>
                            </Button>
                        </div>
                        {errors.password?.message && (
                            <h1 className='font-semibold text-red-500'>{errors.password?.message}</h1>
                        )}
                    </div>
                    <h1 className='font-semibold text-xs'>Ao se cadastrar você aceita nossos <a className='text-blue-500' href='#'>termos de contrato</a> e a nossa <a className='text-blue-500' href='#'>política de privacidade</a>.</h1>
                    <Button size='lg' type='submit' disabled={loading} className='font-bold bg-blue-500 hover:bg-blue-600 disabled:bg-blue-700 disabled:opacity-100'>{loading ? (<LoaderCircle className='animate-spin'/>) : ('Criar conta')}</Button>
                    <h1 className='font-semibold'>Já tem uma conta? <a className='text-blue-500' href='/login'>Clique aqui.</a></h1>
                </form>
            </div>

            <Toaster/>
        </div>
    )
}