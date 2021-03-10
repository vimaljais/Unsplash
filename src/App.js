import "./App.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";

import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Homepage from "./pages/Homepage/homepage.component";
import Header from "./components/Header/Header.component";
import Albums from "./pages/AlbumsPage/albums.component";
import PostsPage from "./pages/PostsPage/PostsPage.component";
import ImagesPage from "./pages/ImagesPage/ImagesPage.component";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/homepage" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />

          <Route exact path="/albums" component={Albums} />
          <Route exact path="/images" component={ImagesPage} />
          <Route exact path="/posts" component={PostsPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
