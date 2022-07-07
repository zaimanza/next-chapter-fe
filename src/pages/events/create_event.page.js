import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import StaticToast from '../../components/toasts/StaticToast.component'
import useEventModule from '../../modules/useEvent.module'
import { peopleLogoutReducer } from '../../providers/people.provider'
import useRegex from '../../utils/useRegex'
import useTimer from '../../utils/useTimer'

const CreateEventPage = () => {
    const dispatch = useDispatch()
    const { timerCountdown, startTimer } = useTimer()
    const navigate = useNavigate()
    const [getToastConfig, setToastConfig] = useState()
    const { regexName, regexDate, regexAddress } = useRegex()
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
    const [getIsLoadingBackend, setIsLoadingBackend] = useState(false)
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
        setIsLoadingBackend(true)
        //regex name
        const yourFirstNameRes = regexName(getYourFirstNameValue)
        if (yourFirstNameRes) setYourFirstNameError("Set a name. e.g. Ryan")
        //regex name
        const yourPartnerFirstNameRes = regexName(getYourPartnerFirstNameValue)
        if (yourPartnerFirstNameRes) setYourPartnerFirstNameError("Set a name. e.g. Katie")
        //regex name
        const locationRes = regexAddress(getLocationValue)
        if (locationRes) setLocationError("Set a wedding location")
        //regex date
        var weddingDateRes = true
        if (getIsWeddingDateCheck === false) {
            weddingDateRes = regexDate(getWeddingDateValue)

            if (!weddingDateRes) setWeddingDateError("Invalid date")
        }

        if (!yourFirstNameRes &&
            !yourPartnerFirstNameRes &&
            !locationRes &&
            weddingDateRes) {

            var createData = {
                your_first_name: getYourFirstNameValue,
                your_partner_first_name: getYourPartnerFirstNameValue,
                wedding_location: getLocationValue,
            }
            if (getIsWeddingDateCheck === false) {
                createData.wedding_date = getWeddingDateValue
            }
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
                    if (result?.error === "Account does not exists.") {
                        dispatch(
                            peopleLogoutReducer()
                        )
                        navigate("/auth");
                    }
                }
            } else {
                // will go to id
                navigate(`/${result?.nc_wedding_id}/edit`)
            }
        }
        setIsLoadingBackend(false)
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
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                {getIsLoadingBackend ?
                                    <div>
                                        <div className="text-center mb-3 font-bold">
                                            Creating your wedding card...
                                        </div>
                                        <div className="flex flex-wrap mt-6 relative">
                                            <div className="w-full  justify-center">
                                                <div className="mx-auto w-fit hover:underline hover:text-blue-600">
                                                    <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : <div>
                                        <form onSubmit={handleSubmit}>

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
                                                    maxLength="100"
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
                                                    maxLength="100"
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
                                                    maxLength="100"
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
                                                    maxLength="300"
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
                                        </form>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEventPage