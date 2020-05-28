import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { receive_packets_action } from "../_actions/Receivers";
import "./DataTable.css";
import DataRow from "./DataRow";
import { v4 as uuidv4 } from "uuid";
class DataTable extends Component {
  handleClick = (e) => {
    console.log(e);
  };
  componentDidMount = () => {
    this.props.receive_packets_action();
  };
  render() {
    //TODO:Differentiate b/w incoming and outgoing packets
    return (
      <Table bordered responsive size="sm">
        <thead>
          <tr onClick={this.handleClick}>
            <th>#</th>
            <th>Device Name</th>
            <th colSpan="6">Packets</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th>HTTPS</th>
            <th>HTTP</th>
            <th>DNS</th>
            <th>FTP</th>
            <th>SSH</th>
            <th>SMTP</th>
          </tr>
          {this.props.list.map((item, index) => (
            <DataRow index={index} item={item} key={`${uuidv4()}`} />
          ))}
        </tbody>
      </Table>
    );
  }
}
const map_state_to_prop = (state) => {
  return {
    list: state.packet.list,
  };
};
export default connect(map_state_to_prop, { receive_packets_action })(
  DataTable
);
