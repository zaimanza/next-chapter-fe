
const GetFont = ({ font_name }) => {
    switch (font_name) {
        case 'Dancing_Script':
            return "font-['Dancing_Script']"
        default:
            return ''
    }
}

export default GetFont