'use client'

import { useState } from "react";
import Header from "./Header";
import Link from "next/link";
import '../styles/transitions.css'
import HomeHeader from "./HomeHeader";

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

export default function RoutineWeeksList({ routine, routineWeeksDays }: { routine: Routine, routineWeeksDays: Map<RoutineWeeks, WeekDay[]> }) {
    const [expandedWeeks, setExpandedWeeks] = useState<string[]>([]);

    const toggleWeek = (routine_week_id: string) => {
        setExpandedWeeks((prev) => (
            prev.includes(routine_week_id)
                ? prev.filter(id => id !== routine_week_id)
                : [...prev, routine_week_id]
        ));
    };

    return (
        <div className="animate-fadeIn">
            <HomeHeader />



            <div className="w-full max-w-4xl mx-auto bg-gray-800 overflow-hidden relative">
                <Header img={routine?.main_img_url} title={routine?.name} />
            </div>

            <div className='bg-gray-800 flex flex-col'>
                {Array.from(routineWeeksDays.keys()).map((routineWeek) => (
                    <div key={routineWeek.routine_week_id} className='mx-3 my-3'>
                        <button
                            onClick={() => toggleWeek(routineWeek.routine_week_id)}
                            className='text-white bg-gray-700 border-teal-500 border-2 w-full rounded-md px-3 py-4'
                        >
                            <p className='text-teal-300 font-bold'>
                                Semana {routineWeek.number}
                            </p>
                        </button>

                        {/* Mostrar días solo si la semana está expandida */}
                        {expandedWeeks.includes(routineWeek.routine_week_id) && (
                            <div className='ml-5 mt-2'>
                                {routineWeeksDays.get(routineWeek)?.map((day) => (
                                    <Link href={`/day/${day.week_day_id}`} key={day.week_day_id}>
                                        <p className='text-white hover:text-teal-300'>
                                            Día {day.number}: {day.name}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}