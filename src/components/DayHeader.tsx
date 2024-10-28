'use client'

import { useEffect, useState } from "react";
import '../styles/transitions.css'

interface PageProps {
    day: number;
    name: string;
}

export default function DayHeader({ day, name }: PageProps) {
    const [smallHeader, setSmallHeader] = useState(false)

    const handleScroll = () => {
        setSmallHeader(window.scrollY > 150)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full h-[30rem] overflow-hidden mt-[5rem]">
            {/* Contenido superpuesto (texto) */}
            <div className={`fixed w-full ${smallHeader ? 'top-16 bg-gray-800/90 shadow-xl' : 'h-[30rem]'} flex flex-col justify-center z-[2000] py-2 mb-5 px-6`}>
                <h1 className={`text-white ${smallHeader ? 'text-sm' : 'text-4xl'} font-bold transition-all duration-200 ease-in-out`}>Día {day} | {name}</h1>
            </div>
        </div>
    );
}