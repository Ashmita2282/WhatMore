import React from 'react'
import styles from "./Grid.module.css";


const NextButton = ({videos, nextIndex, setAnimation, setIsExpanded, setSelectedSize, setInitialPost}) => {

    // Functions to handle next and previous buttons
  const handleNext = () => {
    const nextVideo = videos[nextIndex];
    if (nextVideo) {
      // setInitialPost(nextVideo);
      setAnimation("next");
      setIsExpanded(false); // Reset expanded state
      setSelectedSize(null); // Reset selected size
      setTimeout(() => {
        setInitialPost(nextVideo);
        setAnimation("");  
      }, 500);  

    }
  };

  return (
              <button className={styles.next_btn} onClick={handleNext}>
                &#10095;
              </button>
  )
}

export default NextButton