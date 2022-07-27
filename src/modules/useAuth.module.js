import { useSelector } from 'react-redux';

const axios = require('axios').default;

const nc_be_url = process.env.REACT_APP_NEXT_CHAPTER_BE_API

const useAuthModule = () => {
    const peopleProvider = useSelector((state) => state.people.value)

    const peopleLogin = async ({ email, password }) => {

        const result = await axios?.post(
            nc_be_url + `/auth/people_login`,
            {
                email: email,
                password: password
            })
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

    const peopleRegister = async ({ email, password }) => {

        const result = await axios?.post(
            nc_be_url + `/auth/people_register`,
            {
                email: email,
                password: password
            })
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

    const peopleForgotPassword = async ({ email }) => {

        const result = await axios?.post(
            nc_be_url + `/auth/people_send_verify_password`,
            {
                email: email,
            })
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

    const peopleResetPassword = async ({ password, node_ticket }) => {

        const result = await axios?.post(
            nc_be_url + `/auth/people_reset_password`,
            {
                password: password,
                node_ticket: node_ticket,
            })
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

    const peopleSendVerifyEmail = async ({ email }) => {

        const result = await axios?.post(
            nc_be_url + `/auth/people_send_verify_email`,
            {
                email: email,
            })
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

    const peopleVerifyEmail = async ({ node_ticket }) => {
        const result = await axios?.post(
            nc_be_url + `/auth/people_verify_email`,
            {
                node_ticket: node_ticket,
            })
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

    const peopleChangeEmail = async ({ email }) => {

        const result = await axios?.post(
            nc_be_url + `/auth/people_change_email`,
            {
                email: email,
            },
            {
                headers: {
                    "grXgmgKx3WU42b79": peopleProvider?.access_token
                },
                // timeout: 100000,
                // plenty more options can be added, refer source link above
            })
            .catch(function (error) {
                if (error?.response?.data) {
                    return {
                        error: error?.response?.data?.message ?? "Website is currently offline."
                    }
                }
                if (error?.message) {
                    return {
                        error: error?.message ?? "Website is currently offline."
                    }
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

    const peopleGetEmailAccess = async () => {

        const result = await axios?.get(
            nc_be_url + `/auth/people_get_email_access`,
            {
                headers: {
                    "grXgmgKx3WU42b79": peopleProvider?.access_token
                },
                // timeout: 100000,
                // plenty more options can be added, refer source link above
            })
            .catch(function (error) {
                if (error?.message) {
                    return {
                        error: error?.message ?? "Website is currently offline."
                    }
                }
            })

        if (!result?.data) {
            console.log(result)
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

    const peopleSendVerifyChangeEmail = async () => {

        const result = await axios?.get(
            nc_be_url + `/auth/people_send_verify_change_email`,
            {
                headers: {
                    "grXgmgKx3WU42b79": peopleProvider?.access_token
                },
                // timeout: 100000,
                // plenty more options can be added, refer source link above
            })
            .catch(function (error) {
                if (error?.response?.data) {
                    return {
                        error: error?.response?.data?.message ?? "Website is currently offline."
                    }
                }
                if (error?.message) {
                    return {
                        error: error?.message ?? "Website is currently offline."
                    }
                }
            })

        if (!result?.data) {
            console.log(result)
            if (result?.error) {
                return {
                    error: result?.error ?? "Website is currently offline."
                }
            } else {
                return
            }
        }
        console.log(result)
        return result?.data
    }

    return {
        peopleLogin,
        peopleRegister,
        peopleForgotPassword,
        peopleResetPassword,
        peopleSendVerifyEmail,
        peopleVerifyEmail,
        peopleChangeEmail,
        peopleGetEmailAccess,
        peopleSendVerifyChangeEmail
    }
}

export default useAuthModule