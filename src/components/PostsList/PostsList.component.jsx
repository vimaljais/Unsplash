import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import FaceIcon from "@material-ui/icons/Face";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CommentModal from "../CommentModal/CommentModal.component";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100ch",
    backgroundColor: "rgba(126, 139, 128, 0)",
  },
  inline: {
    display: "inline",
  },
  one: {
    backgroundColor: "rgba(126, 139, 128, 0.5)",
  },

  sel: {
    "&:hover": {
      backgroundColor: "rgb(61, 61, 61, 0.8)",
    },
  },
}));

export default function PostsList({ posts }) {
  const classes = useStyles();

  const [shouldModalDisplay, setModalDisplay] = useState(false);
  const [id, setId] = useState("");

  const openModal = async (id) => {
    setModalDisplay(true);
    setId(id);
  };

  const closeModal = () => {
    setModalDisplay(false);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <List
            style={{
              backgroundColor: "rgba(61, 61, 61, 0.44)",
              marginBottom: "10px",
            }}
            className={classes.root}
          >
            {posts.map((post) => (
              <ListItem
                className={classes.sel}
                style={{ marginBottom: "10px", cursor: "pointer" }}
                alignItems="center"
                key={post.id}
                onClick={() => openModal(post.id)}
              >
                <FaceIcon style={{ paddingRight: "20px" }} />
                <ListItemText
                  primary={post.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {post.body}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}

            <Divider
              style={{ paddingBottom: "5px" }}
              variant="inset"
              component="li"
            />
          </List>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
      {shouldModalDisplay ? (
        <CommentModal
          shouldModalDisplay={shouldModalDisplay}
          setModalDisplay={setModalDisplay}
          id={id}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
}
