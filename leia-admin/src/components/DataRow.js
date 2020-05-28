import React from "react";
import { connect } from "react-redux";
import { select_device_action } from "../_actions/Device";
import _ from "lodash";
class DataRow extends React.Component {
  //   state = {
  //     selectedItem: null,
  //   };
  handleClick = (item, index) => {
    if (this.props.device != null && this.props.device.name === item.name) {
      this.props.select_device_action(null);
    } else {
      this.props.select_device_action(item);
    }
  };

  render() {
    const { item, index } = this.props;
    return (
      <tr
        onClick={() => this.handleClick(item, index)}
        style={
          item.name ===
          (this.props.device === null ? "xxx" : this.props.device.name)
            ? { backgroundColor: "#0c9463" }
            : { backgroundColor: "#dbd7d7" }
        }
      >
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.https === undefined ? 0 : item.https.length}</td>
        <td>{item.http === undefined ? 0 : item.http.length}</td>
        <td>{item.dns === undefined ? 0 : item.dns.length}</td>
        <td>{item.item === undefined ? 0 : item.item.length}</td>
        <td>{item.ssh === undefined ? 0 : item.ssh.length}</td>
        <td>{item.smtp === undefined ? 0 : item.smtp.length}</td>
      </tr>
    );
  }
}
const map_state_to_prop = (state) => {
  return {
    device: state.packet.selected_device,
    list: state.packet.list,
  };
};
export default connect(map_state_to_prop, { select_device_action })(DataRow);
