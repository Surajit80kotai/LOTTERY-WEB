const userCurrency_symbol = (JSON.parse(window.localStorage.getItem("user"))?.currency_symbol)
export const generalCurrency_symbol = process.env.REACT_APP_GENERAL_CURRENCY_SYMBOL

const userCurrency = (JSON.parse(window.localStorage.getItem("user"))?.currency)
export const generalCurrency = process.env.REACT_APP_GENERAL_CURRENCY

const otherCurrency = process.env.REACT_APP_OTHERS_CURRENCY
const otherCurrency_symbol = "$ "

export const currency = (userCurrency === "NGN" || userCurrency === "XAF" || userCurrency === "XAF") ?
    userCurrency
    : otherCurrency
export const currency_symbol = (userCurrency_symbol === "₦" || userCurrency_symbol === "CFA" || userCurrency_symbol === "FCFA") ?
    userCurrency_symbol
    : otherCurrency_symbol