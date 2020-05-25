import { RECEIVE_PACKETS } from "./types/index";
import { populate_users, insert_to_users } from "../utils/packet_parsers";
const packet_regex = new RegExp("[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6} IP");

var nc = require("websocket-nats").connect("ws://localhost:4223");

var users = [{ name: "dum", key: "dum-key" }];
const protocols = ["https", "http", "dns", "ftp", "ssh", "smtp"];

//populate_users(protocols, users);

export const receive_packets_action = () => {
  return async (dispatch) => {
    nc.subscribe("packets", (packet) => {
      const packet_array = packet.split("^*^*^");
      const name = packet_array[0];
      const protocol = packet_array[1];
      const data = packet_array[2].match(packet_regex);
      return async (dispatch) => {
        if (data.length > 0) {
          const user_array = insert_to_users(name, protocol, data, users);
          //update the users list
          users = user_array;
          console.log(user_array);
          console.log(users);
          dispatch({ type: RECEIVE_PACKETS, payload: user_array });
        }
      };
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
