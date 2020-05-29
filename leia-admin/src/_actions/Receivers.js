//2018-01-19 17:50:43.275918
import { RECEIVE_PACKETS, RECEIVE_DATA } from "./types/index";
import {
  insert_to_users,
  get_time_data,
  time_date_both,
} from "../utils/packet_parsers";
const packet_regex = new RegExp(
  "[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6}"
);
const data_length_regex = new RegExp(
  "[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6}[^]* length [0-9]"
);
const only_length = new RegExp("length [0-9]");
var nc = require("websocket-nats").connect("ws://localhost:4223");

var users = [{ name: "dum", key: "dum-key" }];
//const protocols = ["https", "http", "dns", "ftp", "ssh", "smtp"];

//populate_users(protocols, users);

export const receive_packets_action = () => {
  return async (dispatch) => {
    nc.subscribe("packets", (packet) => {
      const packet_array = packet.split("^*^*^");
      const name = packet_array[0];
      const protocol = packet_array[1];
      const data = packet_array[2].match(packet_regex);
      if (data != null && data.length > 0) {
        const user_array = insert_to_users(name, protocol, data, users);
        //update the users list
        users = user_array;
        dispatch({ type: RECEIVE_PACKETS, payload: user_array });
      }
    });
  };
};

var recentTime = 0;
export const receive_time_data_action = () => {
  return async (dispatch) => {
    nc.subscribe("packets", (packet) => {
      const packet_array = packet.split("^*^*^");
      //this is the name of the device
      const name = packet_array[0];
      //this is the data packet of array
      const data = packet_array[2];
      //set recent time in case packet contains only length
      //now this will contain only elements that have a timestamp
      const date_only = data.match(packet_regex);
      if (date_only != null) {
        recentTime = new Date(date_only[date_only.length - 1]).getTime();
      }
      //this will contain both date and length
      const date_time = data.match(data_length_regex);
      //console.log(date_time);
      //console.log(data);
      //   if (date_time != null) {
      //     var res = [];
      //     date_time.forEach((element, index) => {
      //       res.push(time_date_both(element));
      //       if (index === date_time.length - 1)
      //         dispatch({ type: RECEIVE_DATA, payload: res });
      //     });
      //   }
      //this will contain only length
      const length_only = data.match(only_length);
      //   console.log(date_time);
      //   console.log(length_only);
      get_time_data(date_time, length_only, recentTime).then((fullArray) => {
        //console.log(fullArray);
        dispatch({
          type: RECEIVE_DATA,
          payload: { date_length: fullArray, name: name },
        });
      });
    });
  };
};

// export const receive_https_action = () => {
//   return async (dispatch) => {
//     //TODO:Encrypt the packets
//     nc.subscribe("https", (packet) => {
//       const packet_array = packet.match(packet_regex);
//       dispatch({ type: RECEIVE_PACKETS, payload: packet_array });
//     });
//   };
//};
