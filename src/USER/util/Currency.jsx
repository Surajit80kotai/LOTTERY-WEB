const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)
const userCurrency = (JSON.parse(window.localStorage.getItem("user"))?.currency)


const otherCurrency = "USD "
const otherCurrency_symbol = "$ "


export const generalCurrency_symbol = process.env.REACT_APP_GENERAL_CURRENCY_SYMBOL
export const generalCurrency = process.env.REACT_APP_GENERAL_CURRENCY


export const currency = (userCurrency === "NGN" || userCurrency === "XAF" || userCurrency === "XAF") ?
    userCurrency
    : otherCurrency
export const currency_symbol = (userCurrency_symbol === "₦" || userCurrency_symbol === "CFA" || userCurrency_symbol === "FCFA") ?
    userCurrency_symbol
    : otherCurrency_symbol