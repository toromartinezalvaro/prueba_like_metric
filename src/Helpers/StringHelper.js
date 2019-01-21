
export default class StringHelper {
    static digits = (number)=> {
        if (number) {
            return number.toLocaleString(navigator.language, {maximumFractionDigits:2})
        } else {
            return number
        }
    }
}