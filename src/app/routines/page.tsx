import React, { Suspense } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '../utils/supabase/server';
import { redirect } from 'next/navigation';
import RoutinesCarousel from '../components/RoutinesCarousel';
import Logout from '../components/Logout';
import Loading from './loading';


enum RoutineCategory {
    guias = 'guias',
    retos = 'retos',
    otros = 'otros'
}

interface UserRoutine {
    id: number,
    user_id: string,
    routine_id: string
    total_exercises: number;
}

interface Routine {
    routine_id: string;
    name: string;
    main_img_url: string;
    duration: string;
    location: string;
    price: number;
    total_days: number;
    completed_days: number;
    total_sets: number;
    muscles: string;
    instructions: string;
    category: string;
    goal: string;
    muscle: string;
    level: string;
    routine_category: number
}

export default async function RoutinesPage() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    const userRoutinesCategorized: Map<RoutineCategory, Array<{ userRoutine: UserRoutine, routine: Routine }>> = new Map();

    try {

        const [userRoutines, routines] = await Promise.all([
            supabase.from('user_routines').select(),
            supabase.from('routines').select(),
        ])

        if (userRoutines.error) throw userRoutines.error;
        if (routines.error) throw routines.error;

        const userRoutinesData: UserRoutine[] = userRoutines.data ?? [];
        const routinesData: Routine[] = routines.data ?? [];

        // Filter userRoutines by user_id
        const individualUserRoutines = userRoutinesData.filter((userRoutine) => userRoutine.user_id === data.user.id)

        // Group routines ids according to their catgory

        for (const userRoutine of individualUserRoutines) {

            // get corresponding Routine for UserRoutine:
            const routine = routinesData.find((r) => r.routine_id == userRoutine.routine_id)

            if (!routine) {
                console.log(`no routine ${userRoutine.routine_id} for user`)
                continue;
            }

            const category: RoutineCategory = Object.values(RoutineCategory)[routine.routine_category] as RoutineCategory

            if (userRoutinesCategorized.has(category)) {
                const routinesList = userRoutinesCategorized.get(category)
                routinesList?.push({ userRoutine, routine })
            } else {
                userRoutinesCategorized.set(category, [{ userRoutine, routine }])
            }
        }

    } catch (error) {
        console.log('Error fetching data: ', error);
    }


    return <div className='flex flex-col'>
        {/* Header */}
        <div className='fixed w-full z-50 bg-gray-800 py-2 mb-5 shadow-lg flex justify-between items-center px-6'>
            <p className='logo'>SK</p>
            <Logout />
        </div>


        {/* List of routines */}
        <Suspense fallback={<Loading />}>
            <div className='flex flex-col gap-4 px-8 py-24 relative'>
                {Array.from(userRoutinesCategorized).map(([key, value]) => (
                    <div key={key}>
                        <h1 className='pb-4 pt-8'>{key.toString().toUpperCase()}</h1>

                        <RoutinesCarousel>
                            {value.map(({ userRoutine, routine }) => (
                                <div
                                    key={userRoutine.id}
                                    className='w-full overflow-hidden relative rounded-md'
                                >
                                    <Link
                                        href={'/routines/[id]'}
                                        as={`routines/${routine.routine_id}`}
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

                                        <div className='absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-gray-700 to-transparent'>
                                            <p className='text-xl font-bold'>{routine.name}</p>
                                        </div>

                                    </Link>
                                </div>

                            ))}
                        </RoutinesCarousel>


                    </div>
                ))}
            </div>
        </Suspense>

    </div>
}
