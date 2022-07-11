
const GetDayName = ({ date }) => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const d = new Date(date);
    var day = weekday[d.getDay()];

    return day
}

export default GetDayName