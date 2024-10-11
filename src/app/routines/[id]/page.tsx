
import { createClient } from "@/app/utils/supabase/server"
import Header from "@/core/components/Header"
import Image from "next/image"
import Link from "next/link"

interface PageProps {
    params: {
        id: string
    }
}

export default async function Routine({ params }: PageProps) {
    const supabase = createClient()
    const { id } = params

    // fetch routine to get name ad other info
    const { data: routine, error: errorRoutine } = await supabase.from('routines').select().eq('routine_id', id).single()

    if (errorRoutine) {
        console.log('Error fetching', errorRoutine)
    }

    // fetch weeks of the selected routine
    const { data: routineWeeks, error } = await supabase.from('routine_weeks').select().eq('routine_id', `${id}`).order('number', { ascending: true });

    if (error) {
        console.log('Error fetching', error)
    }

    return (
        <>
            <Header />
            {/* Header of weeks info, with name of the routine and image */}
            <div className='w-full max-w-4xl mx-auto bg-gray-800 overflow-hidden  relative'>
                <div className='h-[30rem] md:h-96'>
                    <Image src={routine?.main_img_url} alt={`imagen principal de la rutina ${routine?.name}`} fill={true} objectFit='cover' />


                    <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex items-end p-4'>
                        <div className='flex justify-between gap-3 items-center'>
                            <h1 className='flex-grow text-2xl md:text-4xl font-bold text-teal-300'>{routine?.name}</h1>
                        </div>

                    </div>
                </div>


            </div>
            <div className='bg-gray-800 flex flex-col'>
                {(routineWeeks?.map((routineWeek) => (
                    <Link href={`/week/${routineWeek.routine_week_id}`} key={routineWeek.routine_week_id} className='text-white bg-gray-700 border-teal-500 border-2 mx-3 my-3 rounded-md px-3 py-4'>
                        <p className='text-teal-300 font-bold'>
                            Semana {routineWeek.number}
                        </p>
                    </Link>
                ))
                )}
            </div>
        </>

    )
}