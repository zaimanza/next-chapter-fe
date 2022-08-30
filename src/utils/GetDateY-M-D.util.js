import ZeroInFrontOfSingleInt from "./ZeroInFrontOfSingleInt.util";

const GetDateYMD = ({ date }) => {
    const d = new Date(date);
    var monthName = d.getMonth();
    var yearName = d.getFullYear();
    var dateName = d.getDate()
    return yearName + "-" + ZeroInFrontOfSingleInt(monthName + 1) + "-" + ZeroInFrontOfSingleInt(dateName)
}

export default GetDateYMD