import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ImageGrid from "../../components/ImageGridUnsplash/ImageGridUnsplash.component";
import SearchForm from "../../components/SearchForm/searchForm.component";
import axios from "axios";

import { auth } from "../../firebase/firebase.utils";
import "./ImagesPage.scss";

const ImagesPage = () => {
  const [images, setImages] = useState([]);

  const [query, setQuery] = useState(`Random Images`);
  const [active, setActive] = useState("Random Images");

  const onSubmit = (search) => {
    setQuery(search);
    setActive(search);
  };

  const imageSearch = () => {
    const unsplashApi = "wuq1Fw10R6HLmkRHRy-aMA1Dqn2iBxRHWOF_RG8X_H8";
    const q = query;
    if (q.length > 0) {
      axios
        .get(
          `https://api.unsplash.com/search/photos/?per_page=100&query=${q}&client_id=${unsplashApi}&count=10`
        )
        .then((data) => {
          setImages(data.data.results);
        });
    }
  };

  if (auth.currentUser === null) {
    return <Redirect to="/signin" />;
  } else {
    imageSearch();

    return (
      <div>
        <h1 className="title">UNSPLASH</h1>
        <SearchForm query={query} onSubmit={onSubmit} onSearch={imageSearch} />
        <p className="title" style={{ paddingBottom: "10px" }}>
          Currently Showing - {active}
        </p>
        <ImageGrid images={images} />
      </div>
    );
  }
};

export default ImagesPage;
