import React, { useState, useEffect } from "react";

// nano id
import { nanoid } from "nanoid";

// react redux
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo } from "./redux/actions/todoActions";

// mui comps
import { Button, TextField, Typography } from "@material-ui/core";

// mui styles
import { makeStyles, useTheme } from "@material-ui/core/styles";

// mui icons
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";

// custom comps
import Todos from "./components/Todos";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    width: "300px",
  },
  actions: {
    display: "flex",
  },
  tf: {
    marginRight: "5px",
  },
  addBtn: {
    backgroundColor: theme.palette.success.dark,
    color: "#ffffff",
    border: "none",
    marginLeft: "5px",
  },
  customizeBtn: {
    backgroundColor: theme.palette.warning.dark,
    color: "#ffffff",
    border: "none",
    width: "100%",
    marginTop: "10px",
  },
  addBtnUpdate: {
    backgroundColor: theme.palette.warning.light,
    color: "#ffffff",
    border: "none",
    marginLeft: "5px",
  },
  red: {
    backgroundColor: "red",
  },
}));

function App() {
  // piece of state
  const [value, setValue] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const todos = useSelector((state) => state.todos);
  const selectedTodo = useSelector((state) => state.selectedTodo);
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleAdd = () => {
    setValue("");
    if (updateMode) {
      setUpdateMode(!updateMode);
      if (value.trim() !== "") {
        const updatedTodo = {
          ...selectedTodo,
          title: value,
        };
        dispatch(updateTodo(updatedTodo));
      } else {
        console.log("lutfen doldurun");
      }
    } else {
      if (value.trim() !== "") {
        const newTodo = {
          id: nanoid(),
          title: value,
          isDone: false,
        };
        dispatch(addTodo(newTodo));
      } else {
        console.log("lutfen doldurun");
      }
    }
  };

  const handleUpdate = (e) => {
    e.target.classList.add("red");
    setValue(selectedTodo.title);
    setUpdateMode(!updateMode);
  };

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.actions}>
          <TextField
            id="enterTodo"
            className={classes.tf}
            variant="outlined"
            label="Enter a Todo"
            onChange={(e) => handleChange(e)}
            value={value}
          />
          <Button
            id="addTodo"
            variant="outlined"
            onClick={() => handleAdd()}
            className={classes.addBtn}
            style={{
              backgroundColor: updateMode
                ? theme.palette.warning.main
                : theme.palette.success.dark,
            }}
          >
            {updateMode ? <SettingsIcon /> : <AddIcon />}
          </Button>
        </div>
        {Object.keys(selectedTodo).length > 0 && (
          <Button
            id="updateTodo"
            variant="outlined"
            onClick={(e) => handleUpdate(e)}
            className={classes.customizeBtn}
            disabled={updateMode ? true : false}
          >
            <Typography variant="button">EDIT</Typography>
          </Button>
        )}
      </div>
      <Todos todos={todos} /> {/* todo list */}
    </div>
  );
}

export default App;
