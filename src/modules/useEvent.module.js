
import { useSelector } from "react-redux"
const axios = require('axios').default;

const nc_be_url = process.env.REACT_APP_NEXT_CHAPTER_BE_API

const useEventModule = () => {

    const peopleProvider = useSelector((state) => state.people.value)

    const createEvent = async (createData) => {

        const result = await axios?.post(
            nc_be_url + `/event/create_event`,
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
            nc_be_url + `/event/find_all_general_by_owner_id`,
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

    const findWeddingCard = async ({
        nc_wedding_id
    }) => {

        const result = await axios?.post(
            nc_be_url + `/event/findWeddingCard/${nc_wedding_id}`,
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
                    error: result?.error ?? {
                        message: "Website is currently offline."
                    }
                }
            } else {
                return
            }
        }
        return result?.data
    }

    const isWeddingCardExists = async ({
        nc_wedding_id
    }) => {

        const result = await axios?.post(
            nc_be_url + `/event/is_nc_wedding_id/${nc_wedding_id}`,
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
                    error: result?.error ?? {
                        message: "Website is currently offline."
                    }
                }
            } else {
                return
            }
        }
        return result?.data
    }

    return {
        createEvent,
        findAllGeneralByOwner,
        findWeddingCard,
        isWeddingCardExists
    }
}

export default useEventModule