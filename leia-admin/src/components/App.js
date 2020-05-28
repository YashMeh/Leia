import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import NavBar from "./NavBar";
import Overview from "./Overview";
import PacketVis from "./PacketVis";
import "./App.css";
import TimeChart from "./TimeChart";
import Health from "./Health";
class App extends Component {
  render() {
    return (
      <div className="outer-body">
        <NavBar heading="Leia - Small configurable packet visualiser" />
        <Container>
          <Row style={{ marginBottom: "20px" }}>
            <Col lg="8" sm="8">
              <Overview />
            </Col>
            <Col ls="4" sm="4">
              <PacketVis />
            </Col>
          </Row>
          <Row>
            <Col lg="8" sm="8">
              <TimeChart />
            </Col>
            <Col lg="4" sm="4">
              <Health />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
