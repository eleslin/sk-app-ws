import React from 'react'
import supabase from '../utils/supabase';
import Image from 'next/image';
import Link from 'next/link';

export default async function RoutinesPage() {
    const { data: routines, error } = await supabase.from('routines').select()

    if (error) {
        console.log('Error fetching', error)
    }

    return <div className='flex flex-col'>
        {/* Header */}
        <div className='bg-gray-800 py-5 text-center mb-5'>
            <p className='font-bold text-2xl'>SK Workout</p>
        </div>

        {/* List of routines */}
        <div className='flex flex-col gap-4 px-8'>
            {(routines?.map((routine) => (
                <Link
                    href={'/routines/[id]'}
                    as={`routines/${routine.routine_id}`}
                    key={routine.routine_id}
                    className='w-full overflow-hidden relative'
                >
                    <div className='h-72'>
                        <Image
                            src={routine.main_img_url}
                            alt={routine.name}
                            fill={true}
                            objectFit='cover'
                        />
                        <div className='absolute inset-0 bg-gray-800 bg-opacity-50'></div>
                    </div>

                    <div className='absolute inset-0 p-2 flex flex-col justify-end bg-gradient-to-t from-gray-700 to-transparent'>
                        <p className='text-xl font-bold'>{routine.name}</p>
                    </div>

                </Link>
            ))
            )}
        </div>

    </div>
}