import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

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

export default function CommentModal({
  setModalDisplay,
  id,
  shouldModalDisplay,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    console.log(id);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((data) => {
        console.log(data.data);
        setComments(data.data);
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
          <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={6}>
              <List
                style={{
                  backgroundColor: "rgba(61, 61, 61, 0.88)",
                  marginBottom: "10px",
                }}
                className={classes.root}
              >
                {comments.map((comment) => (
                  <ListItem
                    className={classes.sel}
                    style={{ marginBottom: "10px" }}
                    alignItems="center"
                    key={comment.id}
                  >
                    <FaceIcon
                      style={{ paddingRight: "20px", color: "white" }}
                    />
                    <ListItemText
                      primary={comment.email}
                      style={{ color: "white" }}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            style={{ color: "#d4d4d4" }}
                          >
                            {comment.body}
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
        </Fade>
      </Modal>
    </div>
  );
}
