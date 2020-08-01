import React, { useState, useEffect, Fragment } from 'react'
import Carousal from '../Carousal'
import Select from 'react-select'
import ImageMagnify from './imageMagnify'
import Banner from '../Banner'
import useResize from '../CustomHooks/useResize'
import ProductInfo from '../ProductInfo'


const ProductImageGallery = props => {
    const { products } = props

    const [currentVariantIndex, setCurrentVariantIndex] = useState(0)
    const [disabledBuyNow, setDisabledBuyNow] = useState(true)
    const [finalProductDetails, setFinalProductDetails] = useState({})
    const [goToCart, setGoToCart] = useState(false)
    const [currentImage, setCurrentImage] = useState(products[0].productVariant[currentVariantIndex].variantImages[0])
    const isMobile = useResize()

    useEffect(() => {
        setGoToCart(finalProductDetails.hasOwnProperty(products[0].productVariant[currentVariantIndex].variantName))
    }, [finalProductDetails, currentVariantIndex, products])
    const changeVariant = index => {
        setCurrentVariantIndex(index)
    }

    const currentImageCallbackFun = index => {
        setCurrentImage(products[0].productVariant[currentVariantIndex].variantImages[index])
    }

    const addProducts = () => {
        setFinalProductDetails(() => {
            return {
                [products[0].productVariant[currentVariantIndex].variantName]: {
                    quantity: 1,
                    variantName: products[0].productVariant[currentVariantIndex].variantName,
                    price: 200
                }
            }
        })
        setDisabledBuyNow(false)
    }
    const productImageSettings = {
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        speed: 600,
        infinite: false,
        lazyLoad: false,
        autoplay: false,
        vertical: true,
        verticalSwiping: true,
        dots: false,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    arrows: true,
                    draggable: false,
                    slidesToShow: 3,
                    vertical: false,
                    verticalSwiping: false,
                    variableWidth: false
                }
            }
        ]
    }
    return (
        <Fragment>
            <div className="productColumn1">
                <div className="imageGalleryContainer">
                    <div className="imageDisplayArea">
                        {isMobile ? <Banner {...{
                            height: 'auto',
                            desktopImage: currentImage.desktopImage,
                            smartPhoneImage: currentImage.mobileImage,
                        }} /> : <ImageMagnify
                                src={currentImage && currentImage.desktopImage.file.url} alt='no Image'
                            />}
                    </div>
                    <div className="thumbnailSlider">
                        <Carousal currentImageCallback={currentImageCallbackFun} currentVariantIndex={currentVariantIndex} isProductCarousal settings={productImageSettings} carousalData={products[0].productVariant[currentVariantIndex] && products[0].productVariant[currentVariantIndex].variantImages} />
                    </div>
                </div>
                <div className="selectContainer">
                    <div className="selectInternalContainer">
                        <span style={{
                            fontSize: '20px',
                        }}><b>Sizes</b></span>
                        <Select className="select" classNamePrefix={'select-label'}
                            isSearchable={false}
                            defaultValue={{
                                label: products[0].productVariant[currentVariantIndex] && products[0].productVariant[currentVariantIndex].variantName,
                                value: products[0].productVariant[currentVariantIndex] && products[0].productVariant[currentVariantIndex].variantName
                            }}
                            menuPlacement='top'
                            value={{
                                label: products[0].productVariant[currentVariantIndex] && products[0].productVariant[currentVariantIndex].variantName,
                                value: products[0].productVariant[currentVariantIndex] && products[0].productVariant[currentVariantIndex].variantName
                            }}
                            options={products[0].productVariant.map(variant => ({
                                label: variant.variantName,
                                value: variant.variantName
                            }))}
                            onChange={selected => {
                                changeVariant(products[0].productVariant.map(variant => variant.variantName).indexOf(selected.value))
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="productColumn2">
                <ProductInfo goToCart={goToCart} addProducts={addProducts} buyNowDisabled={disabledBuyNow} {...props} />
            </div>
        </Fragment>
    )
}

export default ProductImageGallery