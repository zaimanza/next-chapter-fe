import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import useEventModule from '../../modules/useEvent.module'

const WeddingCardPage = () => {
    const { nc_wedding_id } = useParams()
    const navigate = useNavigate()
    const _useEventModule = useEventModule()
    const run_uno = useRef(false)

    const peopleProvider = useSelector((state) => state.people.value)

    // eslint-disable-next-line no-unused-vars
    const [getToastConfig, setToastConfig] = useState()

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true

            const initFunctionCall = async () => {

                // findallByOwnerId
                const result = await _useEventModule.findWeddingCard({
                    nc_wedding_id: nc_wedding_id
                })
                console.log(result)
                if (result?.error || !result) {

                    if (result?.error?.error) {
                        setToastConfig({
                            message: "Website is unavailable. Please try again later.",
                            mode: "error"
                        })
                    } else if (result?.error) {
                        setToastConfig({
                            message: result?.error?.message ?? "Website is unavailable. Please try again later.",
                            mode: "error"
                        })
                        navigate("/wedding_card_not_found")
                    } else {
                        setToastConfig({
                            message: "There's no event available.",
                            mode: "warning"
                        })
                    }
                } else {
                    if (result.length !== 0) {
                        // if exist view
                        // setCardList(result)
                    } else {
                        // else go to create_event
                        // navigate("/create_event")
                    }
                }

                // if error view problem with system
            }
            initFunctionCall()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="bg-white w-full  h-screen overflow-hidden">
            <div className="">{nc_wedding_id}</div>
        </div>
    )
}

export default WeddingCardPage