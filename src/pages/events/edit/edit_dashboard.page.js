import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const EditDashboardPage = () => {
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
        <div className="">
            <div className='bottom-0 right-0 fixed mr-4 mb-4'>
                <div className="text-center mt-6">
                    <button
                        className="bg-pink-400 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                    // onClick={handleSubmit}
                    >
                        Launch Event
                    </button>
                </div>
            </div>
            <div>edit_dashboard.page</div>
        </div>
    )
}

export default EditDashboardPage