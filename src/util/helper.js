import store from '../store';

export const actionStatus = () => {
    const state = store.getState();
    return state.common.actionStatus
}

export const textLimit = (text, limit = 100) => {
    if (!text) {
        return null
    }
    if (text.length > limit) {
        return text.substring(0, limit) + "..."
    }
    return text
}
export const getItemPrice = (quantity, price, discount_price) => {
    let tPrice = 0
    if (discount_price !== null) {
        tPrice = tPrice + (quantity * discount_price)
    } else {
        tPrice = tPrice + (quantity * price)
    }
    return tPrice
}
export const priceCal = (price = 0, vat = 0, discount = 0) => {
    let subTotal = price - (price * discount) / 100;
    return Math.floor(subTotal + (subTotal * vat) / 100)
}

export const modalStyle = (width = "700px") => {
    return {
        content: {
            width: width,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: "#000"
        }
    }
}

export const setEndTime = startTime => {
    if (startTime === "09:00:00") {
        return "09:30:00"
    } else if (startTime === "09:30:00") {
        return "10:00:00"
    } else if (startTime === "10:00:00") {
        return "10:30:00"
    } else if (startTime === "10:30:00") {
        return "11:00:00"
    } else if (startTime === "11:00:00") {
        return "11:30:00"
    } else if (startTime === "11:30:00") {
        return "12:00:00"
    } else if (startTime === "12:00:00") {
        return "12:30:00"
    } else if (startTime === "12:30:00") {
        return "13:00:00"
    } else if (startTime === "13:00:00") {
        return "13:30:00"
    } else if (startTime === "13:30:00") {
        return "14:00:00"
    } else if (startTime === "14:00:00") {
        return "14:30:00"
    } else if (startTime === "14:30:00") {
        return "15:00:00"
    } else if (startTime === "15:00:00") {
        return "15:30:00"
    } else if (startTime === "15:30:00") {
        return "16:00:00"
    } else if (startTime === "16:00:00") {
        return "16:30:00"
    } else if (startTime === "16:30:00") {
        return "17:00:00"
    } else if (startTime === "17:00:00") {
        return "17:30:00"
    } else if (startTime === "17:30:00") {
        return "18:00:00"
    } else if (startTime === "18:00:00") {
        return "18:30:00"
    } else if (startTime === "18:30:00") {
        return "19:00:00"
    } 
}