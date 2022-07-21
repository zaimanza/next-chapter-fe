import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CapitalizeString from '../../../utils/CapitalizeString.util'
import TabTitle from '../../../utils/TabTitle.util'

const CardDetailPage = () => {
    const navigate = useNavigate()
    const run_uno = useRef(false)
    const { nc_wedding_id } = useParams()

    const peopleProvider = useSelector((state) => state.people.value)

    useEffect(() => {
        var splited_id = nc_wedding_id.split("_26")
        var title_name = splited_id[0]
        const with_space = title_name.replaceAll('_', ' ');
        const replace_and = with_space.replaceAll('and', '&');
        TabTitle({ newTitle: CapitalizeString(replace_and) + ' - Card Details' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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