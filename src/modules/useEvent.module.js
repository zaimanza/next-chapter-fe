const axios = require('axios').default;

const useEventModule = () => {

    const createEvent = async (createData) => {

        const result = await axios?.post(
            `http://localhost:3001/event/create_event`,
            createData
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

    const findAllGeneralByOwnerId = async ({ owner_uid }) => {

        const result = await axios?.post(
            `http://localhost:3001/event/find_all_general_by_owner_id`,
            {
                owner_uid: owner_uid
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
        findAllGeneralByOwnerId
    }
}

export default useEventModule