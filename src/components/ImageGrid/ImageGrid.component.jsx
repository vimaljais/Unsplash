import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#f6f7f700",
  },
  gridList: {
    width: 1000,
    height: "auto",
  },
}));

export default function ImageGrid(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.photos ? (
        <div>
          <GridList
            cellHeight={300}
            spacing={12}
            className={classes.gridList}
            cols={6}
          >
            {props.photos.map((tile) => (
              <GridListTile key={tile.date} cols={tile.cols || 2}>
                <img src={tile.hdurl} alt={tile.earth_date} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      ) : (
        <div
          style={{
            paddingTop: "100px",
            margin: "0",
            paddingBottom: "10px",
            color: "white",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          loading
        </div>
      )}
    </div>
  );
}
