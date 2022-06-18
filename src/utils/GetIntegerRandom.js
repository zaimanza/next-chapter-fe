
const GetIntegerRandom = ({ min, max }) => {
    return Math.floor(min + Math.random() * (max - min + 1))
}

export default GetIntegerRandom