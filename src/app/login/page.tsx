'use client'

import { useState } from "react"
import validator from 'validator'
import { createClient } from "../utils/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [unvalid, setUnvalid] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validator.isEmail(email)) {
            const { data: user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if (user.user) {
                router.push('/routines')

                await supabase.from('profiles').insert({
                    id: user.user.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
            } else if (error) {
                console.log(error)
            }
            setUnvalid(false)
        } else {
            setUnvalid(true);
        }


    }
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-4">
            <p className="logo">SK</p>
            <form className="flex flex-col gap-12 bg-gray-800 px-8 py-12 rounded-lg shadow-lg">
                <h1 className="text-xl uppercase">Iniciar sesión</h1>
                <div className="flex flex-col gap-4">
                    <input
                        className="px-4 py-2 rounded-md bg-gray-700"
                        type="email"
                        placeholder="Correo"
                        name="user-email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="px-4 py-2 rounded-md bg-gray-700"
                        type="email"
                        placeholder="Contraseña"
                        name="user-email"
                        id="email"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <div className="w-full flex flex-col items-center">
                    {unvalid && <p className="italic text-red-500 text-xs">Correo o contraseña incorrectos</p>}
                    <button
                        type="submit"
                        className="block w-full text-center uppercase bg-gray-900/70 py-2 px-4 shadow-xl font-semibold"
                        onClick={handleSubmit}
                    >
                        Entrar
                    </button>
                </div>
            </form>

            <p>
                ¿No tienes cuenta? <Link replace={true} href={'/signup'} className="underline">Registarse</Link>
            </p>
        </div>

    )
}