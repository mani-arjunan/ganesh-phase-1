import React, { useState } from 'react'
import { Link } from "gatsby"

const Header = props => {
    const [hamClass, setHamClass] = useState('')
    const { logo, links, productRef, navBarClass } = props
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
        setHamClass('')
    }
    return (
        <div className={navBarClass}>
            <div className="logo">
                <Link to="/">
                    <img className={hamClass.length > 0 ? `${hamClass}Logo` : "logoAnchor"} src={logo.desktopImage && logo.desktopImage.file && logo.desktopImage.file.url} alt="logo" />
                </Link>
            </div>
            <div className="navbar">
                <div className="icon-bar" onClick={() => setHamClass('_Menus-show')}>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
                <ul id="nav-lists" className={hamClass}>
                    <li className="close" onClick={() => setHamClass('')}><span>×</span></li>
                    {links.map(linkContent => linkContent.text === 'Product' ? (
                        <li><a style={{
                            color: hamClass.length > 0 ? 'black' : 'white',
                            fontSize: '19px',
                            fontFamily: 'Actor'
                        }} onClick={downIconClick}>{linkContent.text}</a></li>
                    ) : (
                            <li><Link onClick={() => setHamClass('')} style={{
                                color: hamClass.length > 0 ? 'black' : 'white',
                                fontSize: '19px',
                                fontFamily: 'Actor'
                            }} to={linkContent.link}>{linkContent.text}</Link></li>
                        ))}
                </ul>
            </div>
        </div>
    )
}

export default Header