import axios from "axios";
import React, { useState, useEffect } from "react";

import AlbumsList from "../../components/albumsList/albumsList.component";

import { Redirect } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/albums`).then((data) => {
      setAlbums(data.data);
    });

    return () => {
      console.log("cleaned up");
      setAlbums([]);
    };
  }, []);

  if (auth.currentUser === null) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
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
          Albums
        </h1>
        <AlbumsList albums={albums} />
      </div>
    );
  }
};

export default Albums;
