'use client'

import { X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import Cookies from 'js-cookie';
import { api } from "@/services/api";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

interface Props {
    id: string
}

export default function DeleteUser({ id }: Props) {

    const token = Cookies.get('session') as string;

    async function deleteUser() {
        try {
            await api.delete(`/user/delete/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            location.reload()
        } catch (error) {
            toast(`Não foi possível excluir o usuário.`)
        }
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className='border-red-500 text-red-500 hover:border-red-600 hover:text-red-600' variant='outline'><X/> Excluir</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você quer excluir o usuário?</AlertDialogTitle>

                        <AlertDialogDescription>Não será possível recuperar os dados.</AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancelar
                        </AlertDialogCancel>

                        <AlertDialogAction className='bg-red-500 hover:bg-red-600' onClick={deleteUser}>
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Toaster />
        </div>
    )
}