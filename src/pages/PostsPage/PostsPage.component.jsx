import React from "react";
import { Redirect } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";

const PostsPage = () => {
  if (auth.currentUser === null) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <div>
        <h1>PostsPage</h1>
      </div>
    );
  }
};

export default PostsPage;
