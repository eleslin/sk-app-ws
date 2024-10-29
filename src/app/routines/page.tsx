import React from 'react'
import { createClient } from '../utils/supabase/server';
import { redirect } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import '../../styles/transitions.css'
import HomeHeader from '@/components/HomeHeader';
import RoutineCard from '@/components/RoutineCard';


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


    return <div className='flex flex-col animate-fadeIn'>
        {/* Header */}
        <HomeHeader />



        {/* List of routines */}

        {userRoutinesCategorized ? <div className='flex flex-col gap-4 py-24 relative'>
            {Array.from(userRoutinesCategorized).map(([key, value]) => (
                <div key={key}>
                    <h1 className='pb-4 pt-8 px-8'>{key.toString().toUpperCase()}</h1>

                    <div className='flex overflow-y-scroll'>
                        {value.map(({ userRoutine, routine }) => (
                            <RoutineCard routine={routine} key={userRoutine.id} />

                        ))}
                    </div>

                </div>
            ))}
        </div> : <Skeleton count={5} />}

    </div>
}
