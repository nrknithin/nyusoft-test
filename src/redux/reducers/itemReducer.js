import { ActionTypes } from "../constants/actionTypes";

const initialState = { item: {}, items: [] };

export const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ITEMS:
      return { ...state, items: payload };
    case ActionTypes.UPDATE_ITEMS:
      return { ...state, items: [...state?.items, ...payload] };
    case ActionTypes.SET_ITEM:
      return { ...state, item: payload };
    case ActionTypes.UPDATE_ITEM:
      const { name, value } = payload;
      return { ...state, item: { ...state?.item, [name]: value } };
    default:
      return state;
  }
};
