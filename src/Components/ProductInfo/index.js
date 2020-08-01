import React from 'react'

const ProductInfo = props => {
    const { products, buyNowDisabled, goToCart, addProducts } = props;
    return (
        <div className="productContent">
            <h1>{products[0].productTitle}</h1>
            <div className="productDescription">

            </div>
            <div>
                <div className="buyNowButtonContainer">
                    <div>
                        <button className="addToCart" onClick={addProducts} >
                            {goToCart ? 'Go To Cart': 'Add To Cart'}
                        </button>
                    </div>
                    <div>
                        <button className="buyNow" disabled={buyNowDisabled} style={{
                            backgroundColor: buyNowDisabled ? '#dddddd' : null,
                            marginTop: '20px'
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