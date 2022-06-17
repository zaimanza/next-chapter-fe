

const useAuthModule = () => {

    const peopleLogin = async ({ email, password }) => {
        console.log(email)
        console.log(password)
        return true
    }

    const peopleRegister = async ({ email, password }) => {
        console.log(email)
        console.log(password)
        return true
    }

    return {
        peopleLogin,
        peopleRegister
    }
}

export default useAuthModule