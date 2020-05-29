import {
  RECEIVE_PACKETS,
  SELECT_DEVICE,
  RECEIVE_DATA,
} from "../_actions/types";
import _ from "lodash";
export const receive_packet_reducer = (
  state = {
    list: [
      {
        name: "",
        http: [],
        https: [],
        smtp: [],
        dns: [],
        ftp: [],
        ssh: [],
        date_length: [[new Date().getTime(), 0]],
      },
    ],
    selected_device: null,
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
      var name = action.payload.name;
      var newDateLength = action.payload.date_length.slice(0);
      var index = _.findIndex(state.list, { name: name });
      var newList = state.list.slice(0);
      if ("date_length" in newList[index])
        newList[index].date_length = [
          ...newList[index].date_length,
          ...newDateLength,
        ];
      else newList[index].date_length = newDateLength;

      return { ...state, list: newList };
    default:
      return state;
  }
};
