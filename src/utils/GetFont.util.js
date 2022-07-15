
const GetFont = ({ font_name }) => {
    switch (font_name) {
        case 'Dancing_Script':
            return "Dancing Script"
        default:
            return ''
    }
}

export default GetFont