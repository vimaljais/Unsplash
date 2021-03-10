import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { GridList, GridListTile } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PhotoModal({
  setModalDisplay,
  id,
  shouldModalDisplay,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [photos, setPhotos] = React.useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((data) => {
        setPhotos(data.data);
      });

    handleOpen();
    return () => {
      console.log("cleaned up");
    };
  }, [id]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModalDisplay(false);
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          maxHeight: "75%",
          maxWidth: "75%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          left: "10%",
          top: "12%",
        }}
      >
        <Fade in={open}>
          <GridList
            cellHeight={70}
            spacing={5}
            className={classes.gridList}
            cols={30}
          >
            {photos.map((photo) => (
              <GridListTile key={photo.id} cols={5}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </GridListTile>
            ))}
          </GridList>
        </Fade>
      </Modal>
    </div>
  );
}
