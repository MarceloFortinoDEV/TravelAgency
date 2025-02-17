import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function TextClipboard({ children }:any) {

    async function Clipboard() {
        try {
            await navigator.clipboard.writeText(children);

            toast('Copiado!')
        } catch(error) {
            toast('Erro ao copiar.')
        }
    }

    return(
        <div className='flex gap-1'>
            {children ? <p className='bg-transparent border-2 border-solid border-blue-500 min-w-52 font-semibold flex justify-start items-center p-2 rounded-md text-black/50'>{children}</p> : <div className='bg-blue-500 rounded-md'><Skeleton className='w-52 h-11'/></div>}

            <Button className='bg-blue-500  hover:bg-blue-600 size-11' type='button' onClick={Clipboard}><CopyIcon/></Button>

            <Toaster/>
        </div>
    )
}