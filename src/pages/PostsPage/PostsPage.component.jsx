import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import PostsList from "../../components/PostsList/PostsList.component";

import { auth } from "../../firebase/firebase.utils";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((data) => {
      setPosts(data.data);
    });
    return () => {
      console.log("cleaned up");
      setPosts([]);
    };
  }, []);

  if (auth.currentUser === null) {
    alert("Please SignIn");
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
          Posts
        </h1>
        <PostsList posts={posts} />
      </div>
    );
  }
};

export default PostsPage;
