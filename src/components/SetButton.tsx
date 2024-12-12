// CheckButton.tsx
"use client";

import { createClient } from '@/app/utils/supabase/client';
import { useState } from 'react';

interface CheckButtonProps {
    exerciseSetId: string;
    initialCompleted: boolean;
    userId: string;
    // onComplete: (isCompleted: boolean) => void; // Para actualizar el estado en el componente padre
}

export default function SetButton({ exerciseSetId, initialCompleted, userId }: CheckButtonProps) {
    const [isCompleted, setIsCompleted] = useState(initialCompleted);
    const supabase = createClient();

    const handleToggleComplete = async () => {
        try {
            const { error } = await supabase
                .from('user_sets')
                .update({ is_completed: !isCompleted })
                .eq('user_id', userId)
                .eq('exercise_set_id', exerciseSetId);

            if (error) throw error;

            // Actualizar el estado local e informar al componente padre
            setIsCompleted(!isCompleted);
            //onComplete(!isCompleted);
        } catch (error) {
            console.error('Error updating set completion:', error);
        }
    };

    return (
        <button onClick={handleToggleComplete} className="mr-2 text-green-500">
            {isCompleted ? '✔️' : '⬜️'}
        </button>
    );
}