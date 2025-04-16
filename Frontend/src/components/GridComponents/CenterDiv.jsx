import React from 'react'
import styles from "./Grid.module.css";

const CenterDiv = ({initialPost}) => {
  return (
                
                  <video
                    className={styles.center_video}
                    src={initialPost.media_url}
                    controls
                    muted
                    autoPlay
                  >
                    Your browser does not support the video tag.
                  </video>
    
  )
}

export default CenterDiv