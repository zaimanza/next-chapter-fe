const GetDateDMNY = ({ date }) => {

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const d = new Date(date);
    var monthName = month[d.getMonth()];
    var yearName = d.getFullYear();
    var dateName = d.getDate();
    return dateName + " " + monthName + " " + yearName
}

export default GetDateDMNY