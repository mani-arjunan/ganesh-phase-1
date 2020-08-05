export const sendPhoneMessage = (formDetails, totalCartProducts, inputQuantityValue, totalPrice) => {
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
        })
            .then(data => data.json())
            .then(body => {
                if (body.status === 201) {
                    res('success')
                } else {
                    res('error')
                }
            }).catch(err => {
                rej(err)
            })
    })
}


export const queryMessage = (name, email, number, message) => {
    return new Promise((res, rej) => {
        fetch(`${process.env.GATSBY_SENDEMAIL_API}/query-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                message,
                number,
                currentTime: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds(),
                currentDate: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
            })
        })
            .then(data => data.json())
            .then(body => {
                if (body.status === 201) {
                    res('success')
                } else {
                    res('error')
                }
            })
            .catch(err => {
                rej(err)
            })
    })
}