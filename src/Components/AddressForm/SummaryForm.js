import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const SummaryForm = props => {
    const { open, handleForm, formData, orderSummary } = props

    return (
        <div>
            <Dialog style={{
                marginTop: '50px'
            }} open={open} onClose={() => handleForm('return')} aria-labelledby="form-dialog-title">
                <p style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '20px'
                }}>Order Summary</p>
                <hr className="my-1" />
                <DialogContent>
                    <div className="container">
                        <hr style={{
                            borderBottom: '3px solid black'
                        }} />
                        <div className="row" style={{
                            fontSize: '21px',
                            textAlign: 'center',
                            fontFamily: 'fantasy'
                        }}>
                            <div className="col-6 col-md-6">
                                <p>Size</p>
                            </div>
                            <div className="col-6 col-md-6">
                                <p>Quantity</p>
                            </div>
                        </div>
                        {Object.keys(orderSummary.inputQuantityValue).map(orderProp => (
                            <div className="row" style={{
                                textAlign: 'center'
                            }}>
                                <div className="col-6 col-md-6">
                                    <p>{orderProp} :</p>
                                </div>
                                <div className="col-6 col-md-6">
                                    <p><b>{orderSummary.inputQuantityValue[orderProp]}</b></p>
                                </div>
                            </div>
                        ))}
                        <hr style={{
                            borderBottom: '3px solid black'
                        }} />
                        <div className="row" style={{
                            fontSize: '21px',
                            textAlign: 'center',
                            fontFamily: 'fantasy'
                        }}>
                            <div className="col-6 col-md-6">
                                <p>Total Price</p>
                            </div>
                            <div className="col-6 col-md-6">
                                <p>₹ {orderSummary.totalPrice}</p>
                            </div>
                        </div>
                        <hr style={{
                            borderBottom: '3px solid black'
                        }} />
                    </div>
                    {formData.length > 0 && (
                        <div className="container">
                            <h4 style={{
                                textDecoration: 'underline',
                                textAlign: 'center'
                            }}>Address Details:</h4>
                            <hr />
                            {formData.map(addressFields => addressFields.value.length > 0 && (
                                <div className="addressFont row no-gutters py-2">
                                    <p style={{
                                        lineHeight: addressFields.formName === 'Address' ? 'auto' : '5px'
                                    }}>{addressFields.value}</p>
                                </div>
                            ))}
                        </div>
                    )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleForm('return')} color="primary">Cancel</Button>
                    <Button onClick={() => handleForm('submit')} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default SummaryForm