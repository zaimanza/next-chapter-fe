const axios = require('axios').default;

const useAuthModule = () => {

    const peopleLogin = async ({ email, password }) => {

        const loginResult = await axios?.post(
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

        if (!loginResult?.data) {
            if (loginResult?.error) {
                return {
                    error: loginResult?.error ?? "Website is currently offline."
                }
            } else {
                return
            }
        }
        return loginResult?.data
    }

    const peopleRegister = async ({ email, password }) => {

        const registerResult = await axios?.post(
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

        if (!registerResult?.data) {
            if (registerResult?.error) {
                return {
                    error: registerResult?.error ?? "Website is currently offline."
                }
            } else {
                return
            }
        }
        return registerResult?.data
    }

    const peopleForgotPassword = async ({ email }) => {
        console.log(email)
        const ecodedTicket = {
            mode: "send-verify-password",
            node_ticket: "password"
        }
        var encodedStringBtoA = btoa(JSON.stringify(ecodedTicket))
        return encodedStringBtoA
    }

    const peopleResetPassword = async ({ password }) => {
        console.log(password)
        return true
    }

    const peopleSendVerifyEmail = async ({ email }) => {

        const sendVerifyEmailResult = await axios?.post(
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

        if (!sendVerifyEmailResult?.data) {
            if (sendVerifyEmailResult?.error) {
                return {
                    error: sendVerifyEmailResult?.error ?? "Website is currently offline."
                }
            } else {
                return
            }
        }
        return sendVerifyEmailResult?.data
    }

    const peopleSendVerifyPassword = async ({ node_ticket }) => {
        console.log(node_ticket)
        return true
    }

    const peopleVerifyEmail = async ({ node_ticket }) => {
        const verifyEmailResult = await axios?.post(
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

        if (!verifyEmailResult?.data) {
            if (verifyEmailResult?.error) {
                return {
                    error: verifyEmailResult?.error ?? "Website is currently offline."
                }
            } else {
                return
            }
        }
        return verifyEmailResult?.data
    }

    return {
        peopleLogin,
        peopleRegister,
        peopleForgotPassword,
        peopleResetPassword,
        peopleSendVerifyEmail,
        peopleSendVerifyPassword,
        peopleVerifyEmail
    }
}

export default useAuthModule