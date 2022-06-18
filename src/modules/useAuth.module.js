

const useAuthModule = () => {

    const peopleLogin = async ({ email, password, remember_me }) => {
        console.log(email)
        console.log(password)
        console.log(remember_me)
        return true
    }

    const peopleRegister = async ({ email, password }) => {
        console.log(email)
        console.log(password)
        const ecodedTicket = {
            mode: "send-verify-email",
            node_ticket: "email"
        }
        var encodedStringBtoA = btoa(JSON.stringify(ecodedTicket))
        return encodedStringBtoA
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

    const peopleSendVerifyEmail = async ({ node_ticket }) => {
        console.log(node_ticket)
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