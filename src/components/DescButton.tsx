'use client'

import React, { useState } from 'react'
import { IoClose, IoList } from 'react-icons/io5'
import Modal from 'react-modal';

interface Props {
    description?: string | null
}

export default function DescButton({ description }: Props) {
    const [showModal, setShowModal] = useState(false)

    return (description && <>
        <button className={` bg-gray-950 p-4 rounded-full shadow-2xl`} onClick={() => setShowModal(true)}>
            <IoList />
        </button>
        <Modal
            isOpen={showModal}
            className='flex flex-col items-end bg-gray-800 shadow-xl rounded-md m-16 mt-32 overflow-hidden p-4 z-[3000]'
        >
            <button className='text-2xl text-white hover:scale-125 transition-all shadow-xl rounded-xl p-1 z-[3000]' onClick={() => setShowModal(false)}><IoClose /></button>
            {description && <p>{description}</p>}
        </Modal>
    </>

    )
}
