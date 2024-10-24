'use client'

import React, { useState } from 'react'
import { IoClose, IoPlay } from 'react-icons/io5'
import Modal from 'react-modal';

interface Props {
    video?: string | null
}

export default function VideoButton({ video }: Props) {
    const [showModal, setShowModal] = useState(false)

    return (<>
        <button className={`bg-teal-500 p-4 rounded-full`} onClick={() => setShowModal(true)}>
            {video && <IoPlay />}
        </button>
        <Modal
            isOpen={showModal}
            className='flex flex-col items-end bg-gray-800 shadow-xl rounded-md m-16 mt-32 gap-4 relative overflow-hidden'
        >
            <button className='text-2xl text-white hover:scale-125 transition-all absolute top-2 right-2 shadow-xl rounded-xl p-1' onClick={() => setShowModal(false)}><IoClose /></button>
            {video && <video loop={true} autoPlay={true} controls>
                <source src={video!} type="video/mp4" />
            </video>}
        </Modal>
    </>

    )
}
