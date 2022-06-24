import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import StaticToast from '../../components/toasts/StaticToast.component'
import useEventModule from '../../modules/useEvent.module'
import useRegex from '../../utils/useRegex'
import useTimer from '../../utils/useTimer'

const CreateEventPage = () => {
    const { timerCountdown, startTimer } = useTimer()
    const navigate = useNavigate()
    const [getToastConfig, setToastConfig] = useState()
    const { regexName, regexDate } = useRegex()
    const _useEventModule = useEventModule()

    const [getYourFirstNameValue, setYourFirstNameValue] = useState("")
    const [getYourPartnerFirstNameValue, setYourPartnerFirstNameValue] = useState("")
    const [getWeddingDateValue, setWeddingDateValue] = useState("")
    const [getLocationValue, setLocationValue] = useState("")
    const [getIsWeddingDateCheck, setIsWeddingDateCheck] = useState(false)

    const [getYourFirstNameError, setYourFirstNameError] = useState()
    const [getYourPartnerFirstNameError, setYourPartnerFirstNameError] = useState()
    const [getWeddingDateError, setWeddingDateError] = useState()
    const [getLocationError, setLocationError] = useState()
    const [getIsWeddingDateError, setIsWeddingDateError] = useState()
    const run_uno = useRef(false)

    const peopleProvider = useSelector((state) => state.people.value)

    useEffect(() => {
        if (run_uno.current === false) {
            run_uno.current = true
            if (peopleProvider.access_token !== "") {

            } else {
                navigate("/auth");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        //regex name
        const yourFirstNameRes = regexName(getYourFirstNameValue)
        if (yourFirstNameRes) setYourFirstNameError("Set a name. e.g. Ryan")
        //regex name
        const yourPartnerFirstNameRes = regexName(getYourPartnerFirstNameValue)
        if (yourPartnerFirstNameRes) setYourPartnerFirstNameError("Set a name. e.g. Katie")
        //regex name
        const locationRes = regexName(getLocationValue)
        if (locationRes) setLocationError("Set a wedding location")
        //regex date
        const weddingDateRes = true
        if (getIsWeddingDateCheck === false) {
            const weddingDateRes = regexDate(getWeddingDateValue)
            if (!weddingDateRes) setWeddingDateError("Invalid date")
        }

        if (!yourFirstNameRes && !yourPartnerFirstNameRes && !locationRes && weddingDateRes) {
            var createData = {
                your_first_name: getYourFirstNameValue,
                your_partner_first_name: getYourPartnerFirstNameValue,
                wedding_location: getLocationValue,
                owner_uid: peopleProvider?.uid,
                email: peopleProvider?.email
            }
            if (getIsWeddingDateCheck === false) {
                createData.wedding_date = getWeddingDateValue
            }
            console.log(createData)
            const result = await _useEventModule.createEvent(createData)

            if (result?.error || !result) {

                startTimer(10, 1000)
                if (result?.error?.error) {

                    setToastConfig({
                        message: "Website is unavailable. Please try again later.",
                        mode: "error"
                    })
                } else if (result?.error) {
                    setToastConfig({
                        message: result?.error ?? "Website is unavailable. Please try again later.",
                        mode: "error"
                    })
                }
            } else {
                // will go to id
                // navigate("/")
            }
        }
    }

    return (
        <div className='bg-pink-400'>
            <div className="w-full h-full py-40 min-h-screen">
                <div
                    className="my-auto top-0 w-full h-full bg-no-repeat bg-full"
                // style={{
                //     backgroundImage:
                //         "url(" + require("assets/img/register_bg_2.png").default + ")",
                // }}
                >
                    <div className="container mx-auto px-4 h-full">
                        <form onSubmit={handleSubmit}>
                            <div className="flex content-center items-center justify-center h-full">
                                <div className="w-full lg:w-4/12 px-4">

                                    <div className="text-center">
                                        <div className="text-center mb-3 font-bold ">
                                            Start decorating your wedding card
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-center mb-3 font-normal">
                                            <small>Let's add some details.</small>
                                        </div>
                                    </div>
                                    {timerCountdown === 0 ? null : <StaticToast
                                        config={getToastConfig ?? {
                                            message: "Website is unavailable. Please try again later.",
                                            mode: "error"
                                        }}
                                    />}
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Your First Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`${getYourFirstNameError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-3 py-3 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                            placeholder="Ryan"
                                            value={getYourFirstNameValue}
                                            onChange={(event) => {
                                                setYourFirstNameError("")
                                                const onChangeValue = event.target.value
                                                setYourFirstNameValue(onChangeValue)
                                            }}
                                        />
                                        {getYourFirstNameError ? (<p className="text-sm text-red-600 mt-1">{getYourFirstNameError}</p>) : null}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Your Partner's First Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`${getYourPartnerFirstNameError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-3 py-3 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                            placeholder="Katie"
                                            value={getYourPartnerFirstNameValue}
                                            onChange={(event) => {
                                                setYourPartnerFirstNameError("")
                                                const onChangeValue = event.target.value
                                                setYourPartnerFirstNameValue(onChangeValue)
                                            }}
                                        />
                                        {getYourPartnerFirstNameError ? (<p className="text-sm text-red-600 mt-1">{getYourPartnerFirstNameError}</p>) : null}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Wedding Date
                                        </label>
                                        <input
                                            disabled={getIsWeddingDateCheck ? true : false}
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            className={`${getWeddingDateError ?
                                                "ring ring-red-500 placeholder-red-300 text-red-600" :
                                                "focus:ring placeholder-gray-300 text-gray-600"
                                                } focus:outline-none border-0 px-3 py-3 ${getIsWeddingDateCheck ?
                                                    "text-gray-400" :
                                                    "text-black"
                                                } bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                            placeholder="Select date"
                                            value={getWeddingDateValue}
                                            onChange={(event) => {
                                                setWeddingDateError("")
                                                const onChangeValue = event.target.value
                                                setWeddingDateValue(onChangeValue)
                                            }}
                                        />
                                        {getWeddingDateError ? (<p className="text-sm text-red-600 mt-1">{getWeddingDateError}</p>) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                id="customCheckLogin"
                                                type="checkbox"
                                                checked={getIsWeddingDateCheck || false}
                                                onChange={(event) => {
                                                    setIsWeddingDateError(false)
                                                    setIsWeddingDateCheck(event.target.checked)
                                                }}
                                                className={`${getIsWeddingDateError ? "text-red-600 " : "text-gray-700"} selection:form-checkbox border-0 rounded ml-1 w-5 h-5 ease-linear transition-all duration-150`}
                                            />
                                            <span className={`${getIsWeddingDateError ? "text-red-600" : "text-black"} ml-2 text-sm font-semibold`}>
                                                Haven't pick a wedding date
                                            </span>
                                        </label>
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            className={`${getLocationError ? "ring ring-red-500 placeholder-red-300 text-red-600" : "focus:ring placeholder-gray-300 text-gray-600"} focus:outline-none border-0 px-3 py-3 bg-white rounded text-sm shadow w-full ease-linear transition-all duration-150`}
                                            placeholder="Kuala lumpur"
                                            value={getLocationValue}
                                            onChange={(event) => {
                                                setLocationError("")
                                                const onChangeValue = event.target.value
                                                setLocationValue(onChangeValue)
                                            }}
                                        />
                                        {getLocationError ? (<p className="text-sm text-red-600 mt-1">{getLocationError}</p>) : null}
                                    </div>
                                    <div className="mb-11">
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            Decorate Card
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEventPage