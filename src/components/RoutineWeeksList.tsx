'use client'

import { useEffect, useState } from "react";
import Header from "./Header";
import '../styles/transitions.css'
import HomeHeader from "./HomeHeader";
import { IoChevronForward } from "react-icons/io5";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";

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
    const [loadingDay, setLoadingDay] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const toggleWeek = (routine_week_id: string) => {
        setExpandedWeeks((prev) => (
            prev.includes(routine_week_id)
                ? prev.filter(id => id !== routine_week_id)
                : [...prev, routine_week_id]
        ));
    };

    const handleClickDay = async (week_day_id: string) => {
        if (isMounted) {
            setLoadingDay(week_day_id);
            await router.push(`/day/${week_day_id}`);
        }

    }

    return (
        <div className="animate-fadeIn">
            <HomeHeader />

            <div className="w-full max-w-4xl mx-auto bg-gray-800 overflow-hidden relative">
                <Header img={routine?.main_img_url} title={routine?.name} />
            </div>

            <div className='bg-gray-900 flex flex-col'>
                {Array.from(routineWeeksDays.keys()).map((routineWeek) => (
                    <div key={routineWeek.routine_week_id} className='mx-3 my-3 bg-gray-800 rounded-md shadow-md transition-all'>
                        <button
                            onClick={() => toggleWeek(routineWeek.routine_week_id)}
                            className='text-white w-full rounded-md px-3 py-4'
                        >
                            <p className='text-white font-bold'>
                                SEMANA {routineWeek.number}
                            </p>
                        </button>

                        {/* Mostrar días solo si la semana está expandida */}
                        {expandedWeeks.includes(routineWeek.routine_week_id) && (
                            <div className='mt-2 mx-2 animate-fadeInUp'
                            >
                                {routineWeeksDays.get(routineWeek)?.map((day) => (
                                    <div onClick={() => handleClickDay(day.week_day_id)} key={day.week_day_id}>
                                        <div className='text-white bg-gray-700 py-3 px-4 mb-2 rounded-md shadow-sm hover:shadow-lg flex justify-between items-center transition-all'>
                                            <p>Día {day.number}: {day.name}</p>
                                            {loadingDay == day.week_day_id
                                                ? <Spinner color="white" size="sm" />
                                                : <IoChevronForward />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}