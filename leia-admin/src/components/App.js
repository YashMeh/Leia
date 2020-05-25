import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import NavBar from "./NavBar";
import Overview from "./Overview";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <NavBar heading="Leia" />
        <Container className="container">
          <Row>
            <Col>
              <Overview />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
