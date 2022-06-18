// const { //throwError } = require('../../middleware/throw-error')
// import validator from 'validator';
import { isValidPhoneNumber } from 'libphonenumber-js';
import lookup from 'country-code-lookup';

function useRegex() {
    const regexName = (name) => {
        if (name.match(/[||^|*|<|>|?|\\|;]/g) || name.length === 0) {
            return "Invalid name. e.g. Elon Musk"
        }
        if (!name.match(/[A-Za-z]+/g)) {
            return "Invalid name. e.g. Elon Musk"
        }
        if (name.toString().match(/[0-9]|\./g)) {
            return "Invalid name. e.g. Elon Musk"
        }
    }

    const regexEmail = (email) => {
        if (email.length === 0) {
            return "Invalid email. Email needs to contain '@' and '.' with no spaces"
        }
        // if (!validator.isEmail(email)) {
        //     return "Invalid email. Email needs to contain '@' and '.' with no spaces"
        // }
    }

    const regexPassword = (password) => {
        if (password.length === 0) {
            return { message: "Password must be minimum 6 characters, at least 1 uppercase, 1 lowercase letter and 1 number" }
        }
        var haveSpaceRegex = new RegExp("^(?=.*[ ])")
        if (haveSpaceRegex.test(password)) {
            return { message: "Password mustcannot contain spaces" }
        }
        // regex reference: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")

        if (strongRegex.test(password)) {
            return { strength: "strong" }
        } else if (mediumRegex.test(password)) {
            return { strength: "medium" }
        } else {
            return { message: "Password must be minimum 6 characters, at least 1 uppercase, 1 lowercase letter and 1 number", strength: "weak" }
        }
    }

    const regexPhoneNumber = (phone_num) => {
        if (!isValidPhoneNumber(phone_num)) {
            return "Invalid phone number"
        }
    }

    const regexCountryCode = (country_code) => {
        if (!lookup.byInternet(country_code)) {
            return "Invalid country code"
        }
        return country_code.trim()
    }

    const regexBoolean = (boolVal) => {
        if (typeof boolVal != "boolean") {
            return "Expected a boolean value, got " + typeof boolVal + " instead"
        }
    }

    return { regexName, regexEmail, regexPassword, regexPhoneNumber, regexCountryCode, regexBoolean }
}
export default useRegex

