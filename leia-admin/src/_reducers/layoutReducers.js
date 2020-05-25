import { TOGGLE_SIDE, CLEAR_ALL } from "../_actions/types/index";
export const toggleSideBarReducer = (state = { sideStatus: false }, action) => {
  switch (action.type) {
    case TOGGLE_SIDE:
      return { ...state, sideStatus: action.payload };
    default:
      return state;
  }
};
