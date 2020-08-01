import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Header from './Header'

const Layout = props => {
    const { children, isMobile, productRef, headerData, footerData } = props
    const [navBarClass, setNavBarClass] = useState('container')
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    const handleScroll = () => {
        if (window && window.pageYOffset > 0) {
            setNavBarClass('containerMobile')
        } else {
            setNavBarClass('container')
        }
    }
    return (
        <React.Fragment>
            <Helmet>
                <script src='https://kit.fontawesome.com/a076d05399.js'></script>
                <link href='https://fonts.googleapis.com/css?family=Actor' rel='stylesheet'></link>
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Helmet>
            <Header productRef={productRef} isMobile={isMobile} navBarClass={navBarClass} {...headerData} />
            {children}
        </React.Fragment>
    )
}

export default Layout