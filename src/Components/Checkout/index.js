import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import SummaryForm from '../AddressForm/SummaryForm';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog, Button, Backdrop } from '@material-ui/core';

import CartProducts from './CartProducts';
import FormDialog from '../AddressForm';
import sendPhoneMessage from '../../Helpers/SendConfirmation';

const useStyles = makeStyles((theme) => ({
    alertRoot: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Cart = ({ homeClick, ...other }) => {

    const [inputQuantityValue, setInputQuantityValue] = useState({})
    const [totalCartProducts, setTotalCartProducts] = useState(other)
    const [totalPrice, setTotalPrice] = useState(0)
    const [currentButtonValue, setCurrentButtonValue] = useState('Add Address')
    const [isForm, setIsForm] = useState(false)
    const [formDetails, setFormDetails] = useState([])
    const [isSummary, setIsSummary] = useState(false)
    const [loader, setLoader] = useState(false)
    const [confirmAlert, setConfirmAlert] = useState(false)

    const classes = useStyles();

    useEffect(() => {
        return () => {
            setTotalPrice(0)
            setInputQuantityValue({})
            setCurrentButtonValue('Add Address')
            setFormDetails([])
            setIsSummary(false)
            setConfirmAlert(false)
        }
    }, [])

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
        const shallowCopyInputQuantity = { ...inputQuantityValue }
        delete shallowCopyInputQuantity[variant]
        delete shallowCopy[variant]
        setTotalCartProducts(shallowCopy)
        setInputQuantityValue(shallowCopyInputQuantity)
        localStorage.setItem('productInfo', JSON.stringify(shallowCopy))
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

    const totalQuantityCalc = () => {
        let sum = 0;
        Object.keys(inputQuantityValue).map(finalQuantityValue => {
            sum += inputQuantityValue[finalQuantityValue]
        })
        return sum
    }

    const orderConfirm = () => {
        setIsSummary(!isSummary)
    }

    const handleSummaryForm = type => {
        if (type === 'return') {
            setIsSummary(false)
            return
        } else if (type === 'submit') {
            localStorage.removeItem('productInfo')
            setLoader(true)
            sendPhoneMessage(formDetails, totalCartProducts, inputQuantityValue, totalPrice).then(data => {
                setLoader(false)
                setConfirmAlert(true)
            }).catch(err => {
                console.log(err)
            })
        }
        setIsSummary(false)
    }

    const handleCloseAlert = () => {
        setConfirmAlert(false)
        homeClick('home')
    }

    return (
        <div>
            <div className={loader ? '' : classes.alertRoot}>
                {loader && (
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
                {confirmAlert && (
                    <Dialog open={true} bor handleClose={handleCloseAlert}>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                    Your Order has been placed Successfully — <strong>check your inbox or spam!</strong>
                        </Alert>
                        <Button onClick={handleCloseAlert}>close</Button>
                    </Dialog>
                )}
            </div>
            <div className="row text-center mt-5">
                <div className="backHome col-4 col-md-2 col-xs-4">
                    <span role="presentation" onClick={() => homeClick('home')}><b>{">"} Back Home</b></span>
                </div>
                <div className="col-4 col-xs-4">
                    <h3>Cart</h3>
                </div>
            </div>

            <div className="row no-gutters justify-content-center">
                <div className="col-sm-9 p-3">
                    {Object.keys(totalCartProducts).length > 0 ?
                        <CartProducts addressData={formDetails} inputQuantityValue={inputQuantityValue} removeHandler={removeHandler} handleChangeInput={handleChangeInput} cartItems={totalCartProducts} /> : (
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                                <p role="presentation" style={{
                                    background: 'wheat',
                                    border: '2px solid wheat',
                                    display: 'inline-block'
                                }} onClick={() => homeClick('home')}>
                                    <br />
                                    Go Back Home
                                </p>
                            </div>
                        )}
                </div>
                {Object.keys(totalCartProducts).length > 0 &&
                    (<div style={{ marginTop: '65px' }} className="col-sm-3 p-3">
                        <div className="card card-body">
                            <p className="mb-1">Total Items</p>
                            <h4 className=" mb-3 txt-right">{totalQuantityCalc()}</h4>
                            <p className="mb-1">Total Payment</p>
                            <h3 className="m-0 txt-right">₹{totalPrice}</h3>
                            <hr className="my-4" />
                            <p className="mb-1">Payment Mode: <b>Cash on Delivery(COD)</b></p>
                            <hr className="my-4" />
                            <div className="text-center">
                                <button type="button" className="btn btn-primary mb-2" onClick={(type, formData) => handleForm(type, formData)}>
                                    {currentButtonValue}
                                </button>
                                <button type="button" disabled={formDetails.length === 0} className="btn btn-secondary mb-2" onClick={orderConfirm}>
                                    Checkout
                                </button>
                                {isForm ? <FormDialog updatedFormData={formDetails} handleForm={(type, formData) => handleForm(type, formData)} open={isForm} /> : null}
                                {isSummary ? <SummaryForm formData={formDetails} orderSummary={{
                                    totalCartProducts,
                                    inputQuantityValue,
                                    totalPrice,
                                }} isSummary={isSummary} open={isSummary} handleForm={handleSummaryForm} /> : null}
                            </div>
                        </div>
                    </div>
                    )}
            </div>
        </div >
    );
}

export default Cart;