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

//helper function to get timestamp and data-length
export const time_date_both = (data) => {
  var arr = data.split(" ");
  var dd = new Date(new Date(arr[0] + " " + arr[1])).getTime();
  return [dd, Number(arr[arr.length - 1])];
};

export const get_time_data = (date_length, length_only, recentTime) => {
  return new Promise((resolve, reject) => {
    if (date_length === null && length_only === null) resolve([]);
    else if (length_only === null) {
      var res = [];
      date_length.forEach((item, index) => {
        res.push(time_date_both(item));
        if (index === date_length.length - 1) resolve(res);
      });
    } else if (date_length === null) {
      var remaining = length_only.length;
      var x = length_only.length - 1;
      while (remaining--) {
        var arr = length_only[x].split(" ");
        res.push([recentTime, Number(arr[1])]);
        x--;
        if (remaining === 0) resolve(res);
      }
    } else {
      var res = [];
      date_length.forEach((item, index) => {
        res.push(time_date_both(item));
      });

      var remaining = length_only.length - date_length.length;
      if (remaining <= 0) resolve(res);
      var x = length_only.length - 1;
      while (remaining--) {
        var arr = length_only[x].split(" ");
        res.push([recentTime, Number(arr[1])]);
        x--;
        if (remaining === 0) resolve(res);
      }
    }
  });
};
