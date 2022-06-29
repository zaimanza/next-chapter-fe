import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CardDetailPage = () => {
    const navigate = useNavigate()
    const run_uno = useRef(false)
    const { nc_wedding_id } = useParams()

    const peopleProvider = useSelector((state) => state.people.value)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token === "") {
                navigate(`/${nc_wedding_id}`)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>card_detail.page</div>
    )
}

export default CardDetailPage