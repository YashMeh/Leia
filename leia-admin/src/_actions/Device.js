import { SELECT_DEVICE } from "./types/index";
export const select_device_action = (device) => {
  return {
    type: SELECT_DEVICE,
    payload: device,
  };
};
