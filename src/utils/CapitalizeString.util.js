
const CapitalizeString = str => str.split(' ').map(sub => sub.charAt(0).toUpperCase() + sub.slice(1)).join(' ');


export default CapitalizeString