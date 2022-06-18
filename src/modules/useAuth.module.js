const axios = require('axios').default;

const useAuthModule = () => {

    const peopleLogin = async ({ email, password, remember_me }) => {

        return true
    }

    const peopleRegister = async ({ email, password }) => {
        const registerResult = await axios.post(
            `http://localhost:3001/auth/people_register`,
            {
                email: email,
                password: password
            })
            .catch(function (error) {
                if (error.response.data) {
                    return {
                        error: error.response.data
                    }
                } else {
                    return
                }
            })

        if (!registerResult?.data) {
            if (registerResult?.error) {
                return {
                    error: registerResult?.error
                }
            } else {
                return
            }
        }
        // const ecodedTicket = {
        //     mode: "send-verify-email",
        //     node_ticket: "email"
        // }
        // var encodedStringBtoA = btoa(JSON.stringify(ecodedTicket))
        return registerResult.data
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
        console.log(email)
        return true
    }

    const peopleSendVerifyPassword = async ({ node_ticket }) => {
        console.log(node_ticket)
        return true
    }

    return {
        peopleLogin,
        peopleRegister,
        peopleForgotPassword,
        peopleResetPassword,
        peopleSendVerifyEmail,
        peopleSendVerifyPassword
    }
}

export default useAuthModule