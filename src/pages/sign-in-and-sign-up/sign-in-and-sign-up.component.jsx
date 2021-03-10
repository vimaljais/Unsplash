import React from "react";

import "./sign-in-and-sign-up.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import { auth } from "../../firebase/firebase.utils";
import { Redirect } from "react-router";

const SignInAndSignUpPage = () => {
  if (auth.currentUser) {
    return <Redirect to="/homepage" />;
  } else {
    return (
      <div className="sign-in-and-sign-up">
        <SignIn />
        <SignUp />
      </div>
    );
  }
};

export default SignInAndSignUpPage;
