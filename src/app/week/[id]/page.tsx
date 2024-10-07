
import { createClient } from '@/app/utils/supabase/server';
import Link from 'next/link';
import React from 'react'

interface PageProps {
    params: {
        id: string;
    }
}

export default async function WeekPage({ params }: PageProps) {
    const supabase = createClient()
    const { id } = params

    const { data: weekNumber, error: weekError } = await supabase.from('routine_weeks').select('number').eq('routine_week_id', id).single()

    if (weekError) {
        console.log('Error fetching', weekError)
    }

    const { data: weekDays, error } = await supabase.from('week_day').select().eq('routine_week_id', `${id}`);

    if (error) {
        console.log('Error fetching', error)
    }

    return (

        <>
            {/* Header of weeks info, with name of the routine and image */}
            <div className='w-full max-w-4xl mx-auto bg-gray-800 overflow-hidden  relative'>
                <div className='h-64 md:h-96'>
                    <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end p-4'>
                        <h1 className='flex-grow text-2xl md:text-4xl font-bold text-teal-300'>Semana {weekNumber?.number}</h1>
                    </div>
                </div>


            </div>
            <div className='bg-gray-800 flex flex-col'>{
                weekDays?.map((weekDay) => (
                    <Link href={`/day/${weekDay.week_day_id}`} key={weekDay.week_day_id} className='text-white bg-gray-700 border-teal-500 border-2 mx-3 my-3 rounded-md px-3 py-4'>
                        Día {weekDay.number}
                    </Link>
                ))
            }</div>
        </>



    )
}