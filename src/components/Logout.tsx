'use client'

import { IoLogOutOutline } from "react-icons/io5"
import { createClient } from "@/app/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function Logout() {
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (!error) {
            // navigate replace to the splash page
            router.replace('/')
        }
    }


    return (
        <button onClick={handleLogout}>
            <IoLogOutOutline color='#fff' size='40px' />
        </button>
    )
}