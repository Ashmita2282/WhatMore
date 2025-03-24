import {React, useState, useEffect } from "react";
import axios from "axios";
import Connect from '../../components/ClientPanel/Connect'
import FacebookAuth from "../../components/ClientPanel/FacebookAuth";
import Grid from "../../components/ClientPanel/Grid";
import VideoGrid from "../../components/ClientPanel/VideoGrid";


const ClientHome = () => {

  return (
    <>
    <Connect/>
    <FacebookAuth/>
    {/* {location.pathname === "/videoGrid" && (
        <VideoGrid videos={videos} handleVideoClick={handleVideoClick} />
      )}     */}
      {/* {currentPost && (
          <Grid
            closeSlider={closeSlider}
            currentPost={currentPost}
            videos={videos}
          />
        )} */}

    </>
  )
}

export default ClientHome