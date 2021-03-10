import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { auth } from "../../firebase/firebase.utils";

import { selectCurrentUser } from "../../redux/user/user.selector";

import "./header.styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hover: {
    "&:hover": {
      backgroundColor: "rgb(7, 177, 77, 0.42)",
    },
  },
  space: {
    justifyContent: "space-between",
  },
}));

const Header = ({ currentUser }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ textDecoration: "none" }}>
      <AppBar position="static" style={{ backgroundColor: "#2E3B55" }}>
        <Toolbar className={classes.space}>
          <div>
            <Button className={classes.hover} color="inherit">
              {" "}
              <Link
                className="option"
                to="/posts"
                style={{ textDecoration: "none", color: "white" }}
              >
                Posts
              </Link>
            </Button>
            <Button className={classes.hover} color="inherit">
              {" "}
              <Link
                className="option"
                to="/albums"
                style={{ textDecoration: "none", color: "white" }}
              >
                Albums
              </Link>
            </Button>
            <Button color="inherit" className={classes.hover}>
              {" "}
              <Link
                className="option"
                to="/images"
                style={{ textDecoration: "none", color: "white" }}
              >
                Images
              </Link>
            </Button>
            <Button color="inherit" className={classes.hover}>
              <Link
                className="option"
                to="/homepage"
                style={{ textDecoration: "none", color: "white" }}
              >
                HomePage
              </Link>
            </Button>
          </div>
          <div>
            {currentUser ? (
              <div className="option" onClick={() => auth.signOut()}>
                <Button
                  color="inherit"
                  style={{ textDecoration: "none", color: "white" }}
                  className={classes.hover}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link className="option" to="/signin">
                <Button
                  color="inherit"
                  style={{ textDecoration: "none", color: "white" }}
                  className={classes.hover}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
