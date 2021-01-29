import React, { useEffect } from "react";

// mui comps
import { Typography, IconButton } from "@material-ui/core";

// mui hooks
import { makeStyles, useTheme } from "@material-ui/core/styles";

// mui icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import CachedIcon from "@material-ui/icons/Cached";

// react redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  setTodo,
  setSelectedTodo,
} from "../redux/actions/todoActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "0",
    cursor: "pointer",
    borderRadius: "10px",
    margin: "2px 0",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    padding: "5px",
  },
  title: {
    marginLeft: "6px",
  },
  cachedIcon: {
    color: theme.palette.warning.main,
  },
  closeIcon: {
    color: theme.palette.error.main,
  },
  checkIcon: {
    color: theme.palette.success.main,
  },
}));

function Todo({ todo, bgColor }) {
  const classes = useStyles();
  const selectedTodo = useSelector((state) => state.selectedTodo);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClick = (e) => {
    let currentElement = e.currentTarget;
    dispatch(setSelectedTodo(todo));
  };

  const handleDoneClick = (e) => {
    dispatch(setTodo(todo));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteTodo(todo));
  };

  return (
    <li
      className={classes.root}
      style={{
        backgroundColor:
          selectedTodo.id === todo.id ? theme.palette.warning.light : "#ffffff",
      }}
      onClick={(e) => handleClick(e)}
    >
      {/* status icon */}
      <div className={classes.flex}>
        <div onClick={(e) => handleDoneClick(e)}>
          {todo.isDone ? (
            <CheckCircleIcon className={classes.checkIcon} />
          ) : (
            <CachedIcon className={classes.cachedIcon} />
          )}
        </div>
        <div className={classes.title}>
          <Typography variant="subtitle2"> {todo.title} </Typography>
        </div>
      </div>
      <div>
        <IconButton onClick={(e) => handleDelete(e)}>
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      </div>
    </li>
  );
}

export default Todo;
