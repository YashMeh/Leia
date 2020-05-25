import { TOGGLE_SIDE } from "./types/index";
export const toggleSideBarAction = status => {
  return {
    type: TOGGLE_SIDE,
    payload: status
  };
};
