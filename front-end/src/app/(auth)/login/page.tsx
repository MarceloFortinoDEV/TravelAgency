'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/sonner"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { EyeIcon, LoaderCircle } from "lucide-react"
import Cookies from 'js-cookie'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { api } from "@/services/api"
import { toast } from "sonner"

const loginFormSchema = z.object({
    email: z.string().email('Email inválido.').max(100, 'O email não pode ter mais de 100 caracteres.'),
    password: z.string().min(4, 'É necessário no mínimo 4 caracteres.')
})

type LoginFormSchema = z.infer<typeof loginFormSchema>

type PasswordButtonType = 'password' | 'text'

export default function Login() {
    
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    })

    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const [passwordType, setPasswordType] = useState<PasswordButtonType>('password')

    async function userLogin(data: LoginFormSchema) {
        
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email: data.email, password: data.password })

            const token = await response.data.jwtToken as string;

            Cookies.set('session', token, {
                expires: 1,
            })

            router.push('/dashboard');
        } catch(error) {
            toast(`Não foi possivel realizar o login. ${error}`)
        } finally {
            setLoading(false);
        }

    }
    
    return(
        <div className='flex flex-col justify-center items-center h-screen bg-white'>
            <div className='w-80'>
                <h1 className='text-3xl text-center text-gray-950 font-extrabold mb-5'>Travel<span className='text-blue-500'>Agency</span></h1>
                <hr className='mb-5 rounded-full h-2 border-blue-500 border-solid border-2 bg-blue-500'/>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit(userLogin)} >
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
                    <h1 className='font-semibold'>Não tem uma conta? <a className='text-blue-500' href='/register'>Clique aqui.</a></h1>
                    <Button size='lg' type='submit' disabled={loading} className='font-bold bg-blue-500 hover:bg-blue-600 disabled:bg-blue-700 disabled:opacity-100'>{loading ? (<LoaderCircle className='animate-spin'/>) : ('Entrar')}</Button>
                    <Button className='font-bold text-gray-950' variant='ghost'>Esqueci minha senha</Button>
                </form>
            </div>
            
            <Toaster/>
        </div>
    )
}