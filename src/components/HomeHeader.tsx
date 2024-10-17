'use client'

import { useEffect, useState } from "react";
import Logout from "./Logout";

export default function HomeHeader() {
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
            <div className='w-full max-w-4xl mx-auto bg-gray-800 overflow-hidden  relative'>
                <div className={`fixed w-full z-[2000] bg-gray-800 py-2 mb-5 shadow-lg flex justify-between items-center px-6`}>
                    <p className={`logo ${smallHeader ? 'small' : 'large'}`}>SK</p>
                    <Logout small={smallHeader} />
                </div>


            </div>
        </div>
    )
}