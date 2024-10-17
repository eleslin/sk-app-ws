'use client'

import { IoLogOutOutline } from "react-icons/io5"
import { createClient } from "@/app/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Logout({ small }: { small: boolean }) {
    const supabase = createClient()
    const router = useRouter()
    const [iconSize, setIconSize] = useState(small ? '20px' : '40px');

    useEffect(() => {
        // Cambia el tamaño del icono de forma suave al cambiar 'small'
        setIconSize(small ? '20px' : '40px');
    }, [small]);


    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (!error) {
            // navigate replace to the splash page
            router.replace('/')
        }
    }


    return (
        <button onClick={handleLogout}>
            <div style={{
                width: iconSize,
                height: iconSize,
                transition: 'width 0.3s ease, height 0.3s ease'
            }}>
                <IoLogOutOutline color='#fff' style={{ width: '100%', height: '100%' }} />
            </div>
        </button>
    )
}