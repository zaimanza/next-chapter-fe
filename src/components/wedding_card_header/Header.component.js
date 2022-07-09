import React from 'react'

const HeaderComponent = ({
    getCurrentImg,
    getDisplayHeader
}) => {
    return (
        <div className="relative h-full w-full">
            <div className="bg-red-400 absolute z-0 h-full w-full">
                <img
                    src={getCurrentImg}
                    alt="Avatar"
                    className="object-cover w-full h-full" />
            </div>
            {getDisplayHeader}
        </div>
    )
}

export default HeaderComponent

