import React from "react";

// mui hooks
import { makeStyles } from "@material-ui/core/styles";
import Todo from "./Todo";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    background: `linear-gradient(to right, ${theme.palette.warning.dark} 0%, ${theme.palette.warning.light} 100%)`,
  },
}));

function Todos({ todos }) {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default Todos;
