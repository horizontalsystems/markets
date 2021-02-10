/* eslint-disable no-restricted-properties */
class Utils {
    static abbreviateNumber(numInput, fixed) {
        const num = Number.parseFloat(numInput)

        if (num === null) { return null; } // terminate early
        if (num === 0) { return '0'; } // terminate early
        const fixedNum = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
        const b = (num).toPrecision(2).split('e'); // get power
        const k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3)
        const c = k < 1 ? num.toFixed(0 + fixedNum) : (num / Math.pow(10, k * 3)).toFixed(1 + fixedNum)
        const d = c < 0 ? c : Math.abs(c); // enforce -0 is 0
        const e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
        return e;
    }

    static sortByProperty(property) {
        return (a, b) => {
            if (a[property] > b[property]) return 1
            if (a[property] < b[property]) return -1

            return 0
        }
    }

    static sortByPropertyDesc(property) {
        return (a, b) => {
            if (a[property] < b[property]) return 1
            if (a[property] > b[property]) return -1

            return 0
        }
    }
}

export default Utils;
