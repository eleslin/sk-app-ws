'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

interface PageProps {
    img: string;
    title: string;
}

export default function Header({ img, title }: PageProps) {
    const [smallHeader, setSmallHeader] = useState(false)
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setSmallHeader(window.scrollY > 100)
            );
        }
    }, []);

    return (
        <div className='fixed w-full z-50'>
            {smallHeader ? <h1>Small</h1> : <div className='w-full max-w-4xl mx-auto bg-gray-800 overflow-hidden  relative'>
                <div className='h-[30rem] md:h-96'>
                    <Image src={img} alt={`imagen principal de la rutina ${title}`} fill={true} objectFit='cover' />

                    <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end p-4'>
                        <div className='flex justify-between gap-3 items-center'>
                            <h1 className='flex-grow text-2xl md:text-4xl font-bold text-teal-300'>{title}</h1>
                        </div>

                    </div>
                </div>


            </div>}
        </div>
    )
}