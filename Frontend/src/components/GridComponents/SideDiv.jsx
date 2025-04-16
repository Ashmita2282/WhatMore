import React from 'react'
import styles from "./Grid.module.css";

const SideDiv = ({videos, index}) => {
  return (
    <>
                {videos[index] && (
                  <video
                    className={styles.center_video}
                    src={videos[index].media_url}
                    muted
                    autoPlay
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
    </>
  )
}

export default SideDiv