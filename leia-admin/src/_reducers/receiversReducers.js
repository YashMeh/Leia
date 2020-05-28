import {
  RECEIVE_PACKETS,
  SELECT_DEVICE,
  RECEIVE_DATA,
} from "../_actions/types";
import _ from "lodash";
export const receive_packet_reducer = (
  state = {
    list: [
      { name: "", http: [], https: [], smtp: [], dns: [], ftp: [], ssh: [] },
    ],
    selected_device: null,
    time_data: [[new Date().getTime(), 0]],
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_PACKETS:
      var newList = action.payload.slice(0);
      var newDevice = null;
      if (state.selected_device != null) {
        newDevice = {
          ...newList[
            _.findIndex(newList, { name: state.selected_device.name })
          ],
        };
      }
      return { ...state, list: newList, selected_device: newDevice };
    case SELECT_DEVICE:
      var newDevice = action.payload === null ? null : { ...action.payload };
      return { ...state, selected_device: newDevice };
    case RECEIVE_DATA:
      var newList = [...state.time_data, ...action.payload.slice(0)];
      return { ...state, time_data: newList };
    default:
      return state;
  }
};
