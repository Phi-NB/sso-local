import { combineReducers } from "@reduxjs/toolkit";
import main from "./main";
import auth from "./auth";

const rootReducer = combineReducers({
  main,
  auth,
});

export default rootReducer;
