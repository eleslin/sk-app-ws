'use client'

import { useEffect, useState } from "react";
import '../styles/transitions.css'

interface PageProps {
    img: string;
    title: string;
}

export default function Header({ img, title }: PageProps) {
    const [offsetY, setOffsetY] = useState(0);
    const [smallHeader, setSmallHeader] = useState(false)

    const handleScroll = () => {
        setOffsetY(window.scrollY);
        setSmallHeader(window.scrollY > 150)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full h-[30rem] overflow-hidden mt-[5rem]">
            {/* Imagen de fondo con efecto parallax */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${img})`,
                    transform: `translateY(${offsetY * 0.5}px)`, // Control del parallax
                }}
            ></div>

            {/* Contenido superpuesto (texto) */}
            <div className={`fixed w-full ${smallHeader ? 'top-16 bg-gray-800/90 shadow-xl' : 'h-[30rem]'} flex flex-col justify-center z-[2000] py-2 mb-5 px-6`}>
                <h1 className={`text-white ${smallHeader ? 'text-sm' : 'text-4xl'} font-bold transition-all duration-200 ease-in-out`}>{title}</h1>
            </div>
        </div>
    );
}