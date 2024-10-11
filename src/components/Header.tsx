'use client'

import { useEffect, useState } from "react";

export default function Header() {
    const [smallHeader, setSmallHeader] = useState(false)
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () =>
                setSmallHeader(window.scrollY > 100)
            );
        }
    }, []);

    return (
        <div className='fixed w-full p-12 z-50'>
            {smallHeader ? <h1>Small</h1> : <h1>Big</h1>}
        </div>
    )
}