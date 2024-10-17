
import { createClient } from "@/app/utils/supabase/server"
import RoutineWeeksList from "@/components/RoutineWeeksList";

interface RoutineWeeks {
    routine_week_id: string;
    number: number;
    total_days: number;
    completed_days: number;
    routine_id: string;
}

interface WeekDay {
    week_day_id: string;
    number: number;
    name: string;
    rest_day: boolean;
    total_exercises: number;
    completed_exercises: number;
    routine_week_id: string;
}


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

    // create Map where we'll have the routine week as key + routine week days as value
    const routineWeeksDays: Map<RoutineWeeks, WeekDay[]> = new Map();
    // fetch weeks days for each week
    if (routineWeeks) {
        for (const routineWeek of routineWeeks) {
            const { data: weekDays, error } = await supabase.from('week_day').select().eq('routine_week_id', `${routineWeek.routine_week_id}`);

            if (error) {
                console.log('Error fetching', error)
                continue
            }

            routineWeeksDays.set(routineWeek, weekDays ?? []);
        }

        console.log(routineWeeksDays)
    }


    return (
        <RoutineWeeksList routine={routine} routineWeeksDays={routineWeeksDays} />
    )
}