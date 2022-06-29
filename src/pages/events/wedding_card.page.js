import React from 'react'
import { useParams } from 'react-router-dom'

const WeddingCardPage = () => {
    const { nc_wedding_id } = useParams()
    return (
        <div className="bg-white w-full  h-screen overflow-hidden">
            <div className="">{nc_wedding_id}</div>
        </div>
    )
}

export default WeddingCardPage