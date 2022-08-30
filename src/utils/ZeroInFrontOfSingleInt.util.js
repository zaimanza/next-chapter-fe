const ZeroInFrontOfSingleInt = (num, len = 2) => {
    return `${num}`.padStart(len, '0');
}

export default ZeroInFrontOfSingleInt