'use client'

import { Spinner } from "@nextui-org/spinner";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";

export default function HomeLink({ user }: { user: User | null }) {
    const [loading, setLoading] = useState(false)

    return (
        loading
            ? <Spinner color="white" size="lg" />
            : <Link
                prefetch
                onClick={() => setLoading(true)}
                href={`${user ? '/routines' : '/login'}`}
                className="bg-white rounded-md p-2"
            >
                <IoChevronForward size='30px' className="text-gray-800" />
            </Link>
    )
}