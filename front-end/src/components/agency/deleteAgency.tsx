'use client'

import { X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import { api } from "@/services/api";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    id: string
}

interface userData {
    id: number,
    name: string
    email: string
    role: string
}

export default function DeleteAgency({ id }: Props) {

    const token = Cookies.get('session') as string;

    const router = useRouter()

    const [role, setRole] = useState('')

    async function verifyRole(token: string) {
        const decodedToken = jwt.decode(token) as userData;

        const role = decodedToken.role as string;

        setRole(role);
    }

    async function deleteAgency() {
        try {
            await api.delete(`/agency/delete/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            
            toast('Agência excluída com sucesso.')

            router.push('/dashboard')
        } catch(error) {
            toast(`Não foi possível deletar a agência.`)
        }
    }

    useEffect(() => {
        verifyRole(token)
    }, [])

    return (
        <div>
            {role === 'ADMINISTRATOR' && (
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant='destructive' className='font-semibold'><X /> Excluir</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você quer excluir a agência?</AlertDialogTitle>

                        <AlertDialogDescription>Não será possível recuperar os dados.</AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancelar
                        </AlertDialogCancel>

                        <AlertDialogAction className='bg-red-500 hover:bg-red-600' onClick={deleteAgency}>
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            )}

            <Toaster/>
        </div>
    )
}