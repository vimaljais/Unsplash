import React from "react";
import { Redirect } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";

const Albums = () => {
  if (auth.currentUser === null) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <h1>Albums</h1>
      </div>
    );
  }
};

export default Albums;
