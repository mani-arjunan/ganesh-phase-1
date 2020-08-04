const sendPhoneMessage = (formDetails, totalCartProducts, inputQuantityValue, totalPrice) => {
    return new Promise((res, rej) => {
        fetch(`${process.env.GATSBY_SENDEMAIL_API}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formDetails: formDetails,
                totalCartProducts,
                inputQuantityValue,
                totalPrice,
                currentTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
                currentDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
            })
        }).then(data => {
            res(data)
        }).catch(err => {
            rej(err)
        })
    })
}

export default sendPhoneMessage