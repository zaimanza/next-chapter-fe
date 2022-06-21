const axios = require('axios').default;

const useAuthModule = () => {

    const peopleLogin = async ({ email, password }) => {

        const result = await axios?.post(
            `http://localhost:3001/auth/people_login`,
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
            `http://localhost:3001/auth/people_register`,
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
            `http://localhost:3001/auth/people_send_verify_password`,
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
        console.log(password)
        console.log(node_ticket)

        const result = await axios?.post(
            `http://localhost:3001/auth/people_reset_password`,
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
            `http://localhost:3001/auth/people_send_verify_email`,
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
            `http://localhost:3001/auth/people_verify_email`,
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

    return {
        peopleLogin,
        peopleRegister,
        peopleForgotPassword,
        peopleResetPassword,
        peopleSendVerifyEmail,
        peopleVerifyEmail
    }
}

export default useAuthModule