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