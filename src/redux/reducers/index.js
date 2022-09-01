import { combineReducers } from "@reduxjs/toolkit";
import { itemReducer } from "./itemReducer";
const reducers = combineReducers({
  allItems: itemReducer
});
export default reducers;
