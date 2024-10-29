'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Spinner } from '@nextui-org/spinner';

interface RoutineCardProps {
    routine: {
        routine_id: string;
        main_img_url: string;
        name: string;
    };
}

const RoutineCard: React.FC<RoutineCardProps> = ({ routine }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
    };

    return (
        <div className="ml-4 min-w-[200px] overflow-hidden relative rounded-md fadeIn">
            <Link href={`/routines/${routine.routine_id}`} onClick={handleClick}>
                <div className="h-72 relative">
                    <Image
                        src={routine.main_img_url}
                        alt={routine.name}
                        fill={true}
                        objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
                            <Spinner color='white' size='md' /> {/* Define un spinner CSS aquí */}
                        </div>
                    )}
                </div>

                <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-gray-700 to-transparent">
                    <p className="text-xl font-bold">{routine.name}</p>
                </div>
            </Link>
        </div>
    );
};

export default RoutineCard;
