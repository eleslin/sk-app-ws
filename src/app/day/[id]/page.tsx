import React from 'react'
import { createClient } from '@/app/utils/supabase/server';
import VideoButton from '@/components/VideoButton';
import DescButton from '@/components/DescButton';
import HomeHeader from '@/components/HomeHeader';
import DayHeader from '@/components/DayHeader';
interface PageProps {
    params: {
        id: string;
    }
}

interface Exercise {
    exercise_id: string
    spanish_name: string
    spanish_description: string
    technique_video_url: string
}

interface ExerciseSet {
    exercise_set_id: string
    day_exercise_id: string
    number: number
    quantity: number
    reps: number
    rir: number
    is_completed: boolean
}

interface UserSet {
    user_set_id: string
    user_id: string
    exercise_set_id: string
    is_completed: boolean
}

interface WeekDay {
    week_day_id: string
    number: number
    name: string
    rest_day: boolean
    total_exercises: number
    completed_exercises: number
    routine_week_id: string
}

export default async function Page({ params }: PageProps) {
    const supabase = createClient()
    const dayExerciseSet: Map<Exercise, { set: ExerciseSet; userSet: UserSet }[]> = new Map<Exercise, { set: ExerciseSet; userSet: UserSet }[]>();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Manejar caso sin sesión, redirigir o mostrar un mensaje
        console.log("Usuario no autenticado");
        return <p>No estás autenticado</p>;
    }
    const userId = user.id;

    console.log("USER ID IS ", userId)


    let weekDay: WeekDay | null = null;

    const { id } = params

    // get day exercises
    try {
        // Realizamos las consultas en paralelo
        const [dayExercisesResult, exercisesResult, setsResult, userSetsResult, weekDayResult] = await Promise.all([
            supabase.from('day_exercises').select().eq('week_day_id', id),
            supabase.from('exercises').select(),
            supabase.from('sets').select(),
            supabase.from('user_sets').select(),
            supabase.from('week_day').select().eq('week_day_id', id).single()
        ]);



        // Gestionar errores
        if (dayExercisesResult.error) throw dayExercisesResult.error;
        if (exercisesResult.error) throw exercisesResult.error;
        if (setsResult.error) throw setsResult.error;
        if (userSetsResult.error) throw userSetsResult.error;

        const dayExercises = dayExercisesResult.data ?? [];
        const exercises = exercisesResult.data ?? [];
        const sets = setsResult.data ?? [];
        const userSets = userSetsResult.data ?? [];
        weekDay = weekDayResult.data;

        // Obtener los ids de los ejercicios de los day_exercises filtrados
        const exerciseIds = dayExercises.map((dayExercise) => dayExercise.exercise_id);

        // Filtrar los ejercicios por ids obtenidos
        const filteredExercises = exercises.filter((exercise: Exercise) => exerciseIds.includes(exercise.exercise_id));

        // Agrupar los sets por `day_exercise_id`
        const setsGroupedByDayExerciseId = sets.reduce((acc: Record<string, { set: ExerciseSet; userSet: UserSet }[]>, set: ExerciseSet) => {
            const userSet = userSets.find(us => us.exercise_set_id === set.exercise_set_id);
            if (!acc[set.day_exercise_id]) {
                acc[set.day_exercise_id] = [];
            }
            acc[set.day_exercise_id].push({ set, userSet });
            return acc;
        }, {});

        // Asociar cada ejercicio con sus sets
        for (const exercise of filteredExercises) {
            const relatedDayExercises = dayExercises.filter((de) => de.exercise_id === exercise.exercise_id);

            const relatedSets = relatedDayExercises.flatMap((dayExercise) =>
                setsGroupedByDayExerciseId[dayExercise.day_exercise_id] || []
            );

            dayExerciseSet.set(exercise, relatedSets);
        }



    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return (
        dayExerciseSet && <div className="animate-fadeIn">
            <HomeHeader />

            {weekDay && <div className="w-full max-w-4xl mx-auto bg-gray-700 overflow-hidden relative">
                <DayHeader day={weekDay.number} name={weekDay.name} />
            </div>}

            <div className='mt-32 mb-12'>
                {
                    Array.from(dayExerciseSet.entries()).map(([exercise, sets]) => (
                        <article className='bg-gray-800 text-white rounded-md px-4 py-8 my-12 mx-4 flex flex-col gap-4 relative overflow-visible shadow-xl' key={exercise.exercise_id}>
                            <div className='flex items-center'>

                            </div>
                            {sets.map(({ set, userSet }) => (
                                <div className='flex justify-between bg-gray-700 py-1 px-4 rounded-md' key={set.exercise_set_id}>
                                    {/* Check button */}
                                    {/*<SetButton initialCompleted={userSet.is_completed} exerciseSetId={userSet.exercise_set_id} userId={userId} />*/}
                                    {/* Exercise name with conditional strikethrough */}
                                    <p className={`text-2xl font-bold`}>
                                        {exercise.spanish_name}
                                    </p>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-white/70 font-thin'>Series</p>
                                        <p>{set.quantity}</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-white/70 font-thin'>Reps</p>
                                        <p>{set.reps}</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-white/70 font-thin'>RIR</p>
                                        <p>{set.rir}</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p className='text-white/70 font-thin'>Completado</p>
                                        <p>{userSet?.is_completed ? 'Sí' : 'No'}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Text field to add weights */}

                            {/* Video and description */}
                            <div className='absolute -bottom-6 left-0 w-full flex items-center gap-24 justify-center'>
                                <VideoButton video={exercise.technique_video_url} />
                                <DescButton description={exercise.spanish_description} />
                            </div>

                        </article>
                    ))
                }
            </div>

            <div className='h-[5rem]'></div>

        </div>


    )
}