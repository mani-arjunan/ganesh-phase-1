import React from 'react';

import CartItem from './CartItem';

const CartProducts = ({ addressData, inputQuantityValue, handleChangeInput, removeHandler, cartItems }) => {
    return (
        <div>
            <div className="card card-body border-0">
                <h3 className="mb-1">{Object.keys(cartItems).length > 0 && cartItems[Object.keys(cartItems)[0]].productTitle}</h3>
                {
                    Object.keys(cartItems).map(product => (
                        <CartItem
                            key={product.id}
                            inputQuantityValue={inputQuantityValue[product]}
                            removeHandler={() => removeHandler(product)}
                            handleChangeInput={(type) => handleChangeInput(product, type)}
                            productImage={cartItems[product].productImage}
                            productTitle={cartItems[product].productTitle}
                            quantity={cartItems[product].quantity}
                            variantName={cartItems[product].variantName}
                            price={cartItems[product].price}
                        />
                    )
                    )
                }
            </div>
            {addressData.length > 0 && (
                <div className="card card-body border-2">
                    <h4 style={{
                        textDecoration: 'underline'
                    }}>Address:</h4>
                    <hr />
                    {addressData.map(addressFields => addressFields.value.length > 0 && (
                        <div className="addressFont row no-gutters py-2">
                            {addressFields.formName}: <p>{addressFields.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CartProducts;