import React from "react";
import { Navbar, NavbarBrand } from "shards-react";

export default class NavExample extends React.Component {
  render() {
    return (
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand>{this.props.heading}</NavbarBrand>
      </Navbar>
    );
  }
}
