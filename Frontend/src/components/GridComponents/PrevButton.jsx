import React from 'react'
import styles from "./Grid.module.css";


const PrevButton = ({videos, prevIndex, setAnimation, setIsExpanded, setSelectedSize, setInitialPost}) => {

    const handlePrev = () => {
        const prevVideo = videos[prevIndex];
        if (prevVideo) {
          // setInitialPost(prevVideo);
          setAnimation("prev");
          setIsExpanded(false); // Reset expanded state
          setSelectedSize(null); // Reset selected size
          setTimeout(() => {
            setInitialPost(prevVideo);
            setAnimation("");  
            }, 500);
        }
      };

  return (
          <button className={styles.prev_btn} onClick={handlePrev}>
            &#10094;
          </button>
  )
}

export default PrevButton