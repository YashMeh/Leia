import { combineReducers } from "redux";
import { receive_packet_reducer } from "../_reducers/receiversReducers";

export default combineReducers({
  packet: receive_packet_reducer,
});
