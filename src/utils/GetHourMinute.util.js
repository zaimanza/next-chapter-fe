const GetHourMinute = ({ date }) => {

    const d = new Date(date);
    var getHours = d.getHours()
    var getMinutes = d.getMinutes()

    var ampm = "AM"
    if (getHours > 12) {
        ampm = "PM"
    }
    if (getHours > 12) {
        console.log(getHours)
        getHours = getHours - 12
    }
    return getHours + ":" + (getMinutes < 10 && "0") + getMinutes + " " + ampm
}

export default GetHourMinute