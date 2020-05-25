import { RECEIVE_PACKETS } from "../_actions/types";

export const receive_packet_reducer = (
  state = {
    list: [
      { name: "", http: [], https: [], smtp: [], dns: [], ftp: [], ssh: [] },
    ],
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_PACKETS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
