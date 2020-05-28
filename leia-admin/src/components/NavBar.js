import React from "react";
import { Navbar, NavbarBrand } from "shards-react";

export default class NavExample extends React.Component {
  render() {
    return (
      <Navbar type="dark" expand="md" style={{ backgroundColor: "#0c9463" }}>
        <NavbarBrand>{this.props.heading}</NavbarBrand>
      </Navbar>
    );
  }
}
