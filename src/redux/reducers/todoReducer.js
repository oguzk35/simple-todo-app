import {
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  SET_TODO,
  SET_SELECTED_TODO,
} from "../actionTypes";

const INITIAL_STATE = {
  todos: [
    { id: 1, title: "alisveris yap", isDone: false },
    { id: 2, title: "gym e git", isDone: true },
  ],
  selectedTodo: {},
};

export const todoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        selectedTodo:
          action.payload.id === state.selectedTodo.id ? {} : state.selectedTodo,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case SET_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, isDone: !todo.isDone }
            : todo
        ),
      };
    case SET_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: action.payload,
      };
    default:
      return state;
  }
};
