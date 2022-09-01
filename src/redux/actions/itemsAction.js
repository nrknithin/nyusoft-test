import { ActionTypes } from "../constants/actionTypes";

export const setItems = items => {
  return {
    type: ActionTypes?.SET_ITEMS,
    payload: items
  };
};
export const updateItem = (name, value) => {
  return {
    type: ActionTypes?.UPDATE_ITEM,
    payload: { name, value }
  };
};
export const setItem = item => {
  return {
    type: ActionTypes?.SET_ITEM,
    payload: item
  };
};
export const updateItems = items => {
  return {
    type: ActionTypes?.UPDATE_ITEMS,
    payload: items
  };
};
export const selectedItem = item => {
  return {
    type: ActionTypes?.SELECTED_ITEM,
    payload: item
  };
};
