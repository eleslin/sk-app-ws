import React from 'react'
import supabase from '../utils/supabase';




export default async function RoutinesPage() {
    const { data: routines, error } = await supabase.from('routines').select()

    if (error) {
        console.log('Error fetching', error)
    }

    return <div className='m-4 grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {(routines?.map((routine) => (
            <p key={routine.routine_id}>{routine.name}</p>
        ))
        )}
    </div>
}