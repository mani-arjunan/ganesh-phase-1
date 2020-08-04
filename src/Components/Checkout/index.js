import React, { Fragment, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import FormDialog from '../AddressForm';

const Checkout = ({ homeClick, ...other }) => {
    const [inputQuantityValue, setInputQuantityValue] = useState({})
    const [totalCartProducts, setTotalCartProducts] = useState(other)
    const [totalPrice, setTotalPrice] = useState(0)
    const [currentButtonValue, setCurrentButtonValue] = useState('Add Address')
    const [isForm, setIsForm] = useState(false)
    const [formDetails, setFormDetails] = useState([])

    useEffect(() => {
        let totalSum = 0;
        if (Object.keys(totalCartProducts).length === 0) {
            localStorage.removeItem('productInfo')
        } else {
            Object.keys(totalCartProducts).map(finalCartProductData => {
                totalSum += +totalCartProducts[finalCartProductData].price
                setTotalPrice(totalSum)
                setInputQuantityValue(prevInputValue => {
                    return {
                        ...prevInputValue,
                        [totalCartProducts[finalCartProductData].variantName]: 1
                    }
                })
            })
        }
    }, [totalCartProducts])

    const handleChangeInput = (variant, type) => {
        setTotalPrice(() => {
            let total = totalPrice
            if (type === 'add') {
                total += +totalCartProducts[variant].price
                setTotalPrice(total)
            } else {
                total -= +totalCartProducts[variant].price
                setTotalPrice(total)
            }
        })
        setInputQuantityValue(prevInputValue => {
            return {
                ...prevInputValue,
                [variant]: type === 'add' ? prevInputValue[variant] + 1 : (type === 'sub' && prevInputValue[variant] > 1) ? prevInputValue[variant] - 1 : 1
            }
        })
    }

    const removeHandler = variant => {
        const shallowCopy = { ...totalCartProducts }
        delete shallowCopy[variant]
        setTotalCartProducts(shallowCopy)
    }

    const handleForm = (type, formData) => {
        if (type && type === 'submit') {
            setFormDetails(formData)
            setCurrentButtonValue('Edit Address')
            setIsForm(!isForm)
        } else {
            setIsForm(!isForm)
        }
    }

    return (
        <Fragment>
            <div className="backHome">
                <span onClick={() => homeClick('home')}><b>> Back Home</b></span>
            </div>
            <div className="checkoutProductCard">
                <div style={{
                    fontSize: '22px',
                    lineHeight: '56px',
                    padding: '0 24px',
                    fontWeight: '500',
                    fontFamily: 'sans-serif'
                }}><b>{Object.keys(totalCartProducts).length > 0 && totalCartProducts[Object.keys(totalCartProducts)[0]].productTitle}</b>
                </div>
                {Object.keys(totalCartProducts).length > 0 ?
                    Object.keys(totalCartProducts).map(finalCartProductData => {
                        return (
                            <div className="productCartContainerArea">
                                <span onClick={() => removeHandler(finalCartProductData)} className="close">
                                    <svg viewPort="0 0 12 12" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <line x1="1" y1="11"
                                            x2="11" y2="1"
                                            stroke="black"
                                            stroke-width="2" />
                                        <line x1="1" y1="1"
                                            x2="11" y2="11"
                                            stroke="black"
                                            stroke-width="2" />
                                    </svg>
                                </span>
                                <div className="productImageContainer" >
                                    <img style={{
                                        height: '112px',
                                        width: '112px',
                                        position: 'relative',
                                        margin: '0 auto'
                                    }} alt="alternate variant image:" src={totalCartProducts[finalCartProductData].productImage} />
                                </div>
                                <div className="productCartTitle">
                                    <div style={{
                                        display: 'block',
                                        color: '#878787',
                                        fontSize: '30px',
                                        marginTop: '10px',
                                        height: '20px'
                                    }}>
                                        {totalCartProducts[finalCartProductData].variantName}
                                    </div>
                                </div>
                                <div className="increaseDecreaseContainer">
                                    <button disabled={inputQuantityValue[finalCartProductData] === 1} onClick={() => handleChangeInput(finalCartProductData, 'sub')} className="subButton">-</button>
                                    <div className="inputCartContainer">
                                        <input disabled value={inputQuantityValue[finalCartProductData]} className="inputCart" />
                                    </div>
                                    <button onClick={() => handleChangeInput(finalCartProductData, 'add')} className="addButton">+</button>
                                </div>
                                <div className="individualPriceContainer">
                                    Price: <b>₹{totalCartProducts[finalCartProductData].price}</b>
                                </div>
                            </div>
                        )
                    }) : (
                        <div style={{
                            textAlign: 'center',
                            fontFamily: 'monospace',
                            fontSize: '20px',
                        }}>
                            No Products
                            <div style={{
                                marginTop: '20px',
                                cursor: 'pointer'
                            }}>
                                <p style={{
                                    background: 'wheat',
                                    border: '2px solid wheat',
                                    display: 'inline-block'
                                }} onClick={() => homeClick('home')}>
                                    Go Back Home
                                </p>
                            </div>
                        </div>
                    )}
                {Object.keys(totalCartProducts).length > 0 && (
                    <>
                        <div className="priceContainer">
                            Total Price: <b>₹{totalPrice}</b>
                        </div>

                        <div className="dynamicButtonContainer">
                            <div className="currentButton">
                                <Button onClick={(type, formData) => handleForm(type, formData)} variant="outlined" color="secondary">
                                    {currentButtonValue}
                                </Button>
                            </div>
                            {formDetails.length > 0 && (
                                <div className="submitButton">
                                    <Button onClick={(type, formData) => handleForm(type, formData)} variant="contained" color="primary">
                                        Checkout
                                    </Button>
                                </div>
                            )}
                            {isForm ? <FormDialog updatedFormData={formDetails} handleForm={(type, formData) => handleForm(type, formData)} open={isForm} /> : null}
                        </div>
                    </>
                )}
            </div>

        </Fragment >
    )
}

export default Checkout