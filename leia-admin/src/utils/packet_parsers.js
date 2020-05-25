import _ from "lodash";
const packet_regex = new RegExp("^[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{6} IP");

//function to check if a string is a valid packet or not
export const is_packet_valid = (packet) => {
  return packet_regex.test(packet);
};

//function to extract the object{timestamp:TIMESTAMP} of valid packets
export const is_packet = (packet) => {
  let packet_array = [];
  let string_array = packet.split("\n");
  string_array.map((packet_string, index) => {
    if (is_packet(packet_string)) {
      packet_array.push({ timestamp: packet_string.substr(0, 15) });
    }
    if (index === string_array.length) return packet_array;
  });
};

//helper function to populate the users array
export const populate_users = (protocols, users) => {
  users.forEach((user) => {
    protocols.forEach((proto) => {
      user.proto = [];
    });
  });
};

//helper function to insert respective packet data to the user
export const insert_to_users = (user, proto, data, users) => {
  let userIndex = _.findIndex(users, { name: user });
  if (proto in users[userIndex])
    users[userIndex][proto] = [...users[userIndex][proto], ...data];
  else users[userIndex][proto] = [...data];
  return users;
};
