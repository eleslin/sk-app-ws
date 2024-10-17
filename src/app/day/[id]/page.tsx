import React from 'react'
import { createClient } from '@/app/utils/supabase/server';
import VideoButton from '@/components/VideoButton';
import DescButton from '@/components/DescButton';
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

}

export default async function Page({ params }: PageProps) {
    const supabase = createClient()
    const dayExerciseSet: Map<Exercise, ExerciseSet[]> = new Map<Exercise, ExerciseSet[]>()

    const { id } = params

    // get day exercises
    try {
        // Realizamos las consultas en paralelo
        const [dayExercisesResult, exercisesResult, setsResult] = await Promise.all([
            supabase.from('day_exercises').select().eq('week_day_id', id),
            supabase.from('exercises').select(),
            supabase.from('sets').select(),
        ]);

        // Gestionar errores
        if (dayExercisesResult.error) throw dayExercisesResult.error;
        if (exercisesResult.error) throw exercisesResult.error;
        if (setsResult.error) throw setsResult.error;

        const dayExercises = dayExercisesResult.data ?? [];
        const exercises = exercisesResult.data ?? [];
        const sets = setsResult.data ?? [];

        // Obtener los ids de los ejercicios de los day_exercises filtrados
        const exerciseIds = dayExercises.map((dayExercise) => dayExercise.exercise_id);

        // Filtrar los ejercicios por ids obtenidos
        const filteredExercises = exercises.filter((exercise: Exercise) => exerciseIds.includes(exercise.exercise_id));

        // Agrupar los sets por `day_exercise_id`
        const setsGroupedByDayExerciseId = sets.reduce((acc: Record<string, ExerciseSet[]>, set: ExerciseSet) => {
            if (!acc[set.day_exercise_id]) {
                acc[set.day_exercise_id] = [];
            }
            acc[set.day_exercise_id].push(set);
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
        <>
            {
                Array.from(dayExerciseSet.entries()).map(([exercise, sets]) => (
                    <article className='bg-gray-800 text-white border-2 border-gray-700 rounded-md px-4 py-8 my-12 mx-4 flex flex-col gap-4 relative overflow-visible' key={exercise.exercise_id}>
                        <p className='text-2xl font-bold'>{exercise.spanish_name}</p>

                        {sets.map((set) => (
                            <div className='flex justify-between' key={set.exercise_set_id}>
                                <div className='flex flex-col items-center'>
                                    <p className='text-teal-300 font-semibold'>Series</p>
                                    <p>{set.quantity}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className='text-teal-300 font-semibold'>Reps</p>
                                    <p>{set.reps}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <p className='text-teal-300 font-semibold'>RIR</p>
                                    <p>{set.rir}</p>
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
        </>


    )
}