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
        setSmallHeader(window.scrollY > 200)
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
            {smallHeader
                ? <div className="fixed w-full min-h-[6.5rem] top-0 bg-gray-800/90 shadow-lg flex flex-col items-center justify-end slideIn">
                    <h1 className="text-white text-xl font-bold mb-2">{title}</h1>
                </div>
                : <div className="relative z-10 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
                    <h1 className="text-white text-4xl font-bold">{title}</h1>
                </div>}
        </div>
    );
}