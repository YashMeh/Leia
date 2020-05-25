import { combineReducers } from "redux";
import { toggleSideBarReducer } from "../_reducers/layoutReducers";
import { receive_packet_reducer } from "../_reducers/receiversReducers";

export default combineReducers({
  sideStatus: toggleSideBarReducer,
  packet: receive_packet_reducer,
});
