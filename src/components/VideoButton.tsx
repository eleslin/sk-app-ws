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
            className='flex flex-col items-end p-10 bg-gray-900 m-10 gap-4'
        >
            <button className='text-2xl bg-teal-500 rounded-md p-1 text-white -mr-4 -mt-4' onClick={() => setShowModal(false)}><IoClose /></button>
            {video && <video loop={true} autoPlay={true} controls>
                <source src={video!} type="video/mp4" />
            </video>}
        </Modal>
    </>

    )
}
