import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ImageGrid from "../../components/ImageGrid/ImageGrid.component";
import axios from "axios";

import { auth } from "../../firebase/firebase.utils";

const Homepage = () => {
  const [url, setUrl] = useState("");
  const [images, setImages] = useState("");

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.nasa.gov/planetary/apod?api_key=ubTNhbfztJyZsy5OOgfH1W37HeqXpIG7CxbT6oko`
        )
        .then((response) => {
          setUrl(response.data.hdurl);
        });
    } catch (error) {
      console.log(error);
    }
    return () => {
      console.log("cleaned up");
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=ubTNhbfztJyZsy5OOgfH1W37HeqXpIG7CxbT6oko&count=25`
      )
      .then((response) => {
        setImages(response.data);
      });
    return () => {
      console.log("cleaned up");
    };
  }, []);

  if (auth.currentUser === null) {
    alert("Please SignIn");
    return <Redirect to="/signin" />;
  } else {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url(" + url + ")",
          backgroundPosition: "fill",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <h1
          style={{
            paddingTop: "30px",
            margin: "0",
            paddingBottom: "30px",
            color: "white",
            border: "3px black",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          Random Images from NASA
        </h1>
        <ImageGrid photos={images} />
      </div>
    );
  }
};

export default Homepage;
