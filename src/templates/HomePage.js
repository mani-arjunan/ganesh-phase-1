import React, { useRef } from 'react'
import { graphql } from 'gatsby'
import Layout from '../Components/Layout'
import Carousal from '../Components/Carousal'
import ProductImageGallery from '../Components/ProductImageGallery'
import Video from '../Components/Video/Video'
import useResize from '../Components/CustomHooks/useResize'

const homeSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const HomePage = props => {
  const { pathContext, data } = props
  const { contentfulHomePage } = data
  const isMobile = useResize()
  const productRef = useRef()

  const downIconClick = () => {
    let userAgentString = navigator.userAgent
    let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1
    if (IExplorerAgent === true) {
      window.scrollTo(0, productRef.current.offsetTop - 70)
    }
    else {
      productRef.current
        .scrollIntoView({
          behavior: "smooth"
        })
    }
  }
  return (
    <Layout isMobile={isMobile} productRef={productRef} {...pathContext} >
      <div style={{
        position: 'relative'
      }}>
        <div style={{
          position: 'relative'
        }}>
          <Video {...contentfulHomePage} />
          {/* <Carousal isProductCarousal={false} settings={homeSettings} height={650} carousalData={contentfulHomePage.carousal} /> */}
          {!isMobile && (
            <div className="downIcon">
              <i onClick={downIconClick} class='fas fa-angle-double-down' style={{ cursor: "pointer", fontSize: "30px", width: '14px', color: 'white' }}></i>
            </div>)}
        </div>
        <div ref={productRef} className="productRow">
          <ProductImageGallery {...contentfulHomePage} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
    query HomePage {
        contentfulHomePage {
            name
            video {
              name
              mobileVideo {
                file {
                  url
                }
              }
              desktopVideo {
                file {
                  url
                }
              }
            }
            products {
                name
                productTitle
                productVariant {
                  ... on ContentfulVariant {
                    variantName
                    variantImages {
                      mobileImage {
                        file {
                          url
                        }
                      }
                      desktopImage {
                        file {
                          url
                        }
                      }
                    }
                  }
                }
              }
            carousal {
              name
              desktopImage {
                file {
                  url
                }
              }
              mobileImage {
                file {
                  url
                }
              }
            }
        }
    }
`

export default HomePage