import React, { useState } from "react";

import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import PhotoModal from "../PhotosModal/PhotosModal.component";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  demo: {
    backgroundColor: "rgba(126, 139, 128, 0)",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  sel: {
    "&:hover": {
      backgroundColor: "rgb(61, 61, 61, 0.8)",
    },
  },
}));

const AlbumsList = ({ albums }) => {
  const classes = useStyles();
  const [dense] = useState(true);
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
    <div className={classes.root}>
      {" "}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs md={6}>
          <div className={classes.demo}>
            <List
              style={{ backgroundColor: "rgba(61, 61, 61, 0.44)" }}
              dense={dense}
            >
              {albums.map((album) => (
                <ListItem
                  onClick={() => openModal(album.id)}
                  style={{ cursor: "pointer" }}
                  className={classes.sel}
                  key={album.id}
                >
                  <ListItemIcon>
                    <PhotoAlbumIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={album.title}
                    secondary={album.userID}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
      {shouldModalDisplay ? (
        <PhotoModal
          shouldModalDisplay={shouldModalDisplay}
          setModalDisplay={setModalDisplay}
          id={id}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
};

export default AlbumsList;
