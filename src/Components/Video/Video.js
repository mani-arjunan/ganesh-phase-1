import React from "react"
import useResize from "../CustomHooks/useResize"

const Video = props => {
    const isMobile = useResize()
    const { video } = props
    return (
        <div className="videoContainer">
            <div className="videoWrapper">
                <video
                    className="video"
                    playsInline
                    preload='metadata'
                    loop
                    muted
                    controls={true}
                    playsInline
                    autoPlay={true}
                    src={video[0].desktopVideo.file.url}
                >
                    <track kind='captions' />
                </video>
            </div>
        </div>
    )
}

export default Video
