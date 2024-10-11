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
        <button className={` bg-teal-500 p-4 rounded-full`} onClick={() => setShowModal(true)}>
            <IoList />
        </button>
        <Modal
            isOpen={showModal}
            className='flex flex-col items-end p-10 bg-gray-900 m-10 gap-4'
        >
            <button className='text-2xl bg-teal-500 rounded-md p-1 text-white -mr-4 -mt-4' onClick={() => setShowModal(false)}><IoClose /></button>
            {description && <p>{description}</p>}
        </Modal>
    </>

    )
}
