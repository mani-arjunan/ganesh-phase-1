import React from 'react'

const ProductInfo = props => {
    const { products, buyNowDisabled, buyNowWrapperClick, currentVariantIndex, goToCart, addProducts } = props;
    return (
        <div className="productContent">
            <h1>{products[0].productTitle}</h1>
            <div className="productPriceContainer">Price</div>
            <div className="productPriceValue"><b>₹ {products[0].productVariant[currentVariantIndex].productPrice}</b></div>
            <div className="productDescription">

            </div>
            <div>
                <div className="buyNowButtonContainer">
                    <div>
                        <button className="addToCart" onClick={addProducts} >
                            {goToCart ? 'Go To Cart' : 'Add To Cart'}
                        </button>
                    </div>
                    <div>
                        <button onClick={buyNowWrapperClick} className="buyNow" disabled={buyNowDisabled} style={{
                            backgroundColor: buyNowDisabled ? '#dddddd' : null,
                            marginTop: '20px',
                            marginBottom: '30px'
                        }} >
                            Buy Now
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo