
import { useSelector } from "react-redux"
const axios = require('axios').default;

const useEventModule = () => {

    const peopleProvider = useSelector((state) => state.people.value)

    const createEvent = async (createData) => {

        const result = await axios?.post(
            `http://localhost:3001/event/create_event`,
            createData,
            {
                headers: {
                    "grXgmgKx3WU42b79": peopleProvider?.access_token
                },
                timeout: 1000,
                // plenty more options can be added, refer source link above
            }
        )
            .catch(function (error) {
                if (error?.response?.data) {
                    return {
                        error: error?.response?.data ?? "Website is currently offline."
                    }
                } else {
                    return
                }
            })

        if (!result?.data) {
            if (result?.error) {
                return {
                    error: result?.error ?? "Website is currently offline."
                }
            } else {
                return
            }
        }
        return result?.data
    }

    const findAllGeneralByOwner = async () => {

        const result = await axios?.post(
            `http://localhost:3001/event/find_all_general_by_owner_id`,
            {},
            {
                headers: {
                    "grXgmgKx3WU42b79": peopleProvider?.access_token
                },
                timeout: 1000,
                // plenty more options can be added, refer source link above
            }
        )
            .catch(function (error) {
                if (error?.response?.data) {
                    return {
                        error: error?.response?.data ?? "Website is currently offline."
                    }
                } else {
                    return
                }
            })

        if (!result?.data) {
            if (result?.error) {
                return {
                    error: result?.error ?? "Website is currently offline."
                }
            } else {
                return
            }
        }
        return result?.data
    }

    return {
        createEvent,
        findAllGeneralByOwner
    }
}

export default useEventModule