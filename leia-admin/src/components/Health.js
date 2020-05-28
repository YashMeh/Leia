import React from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "shards-react";
class Health extends React.Component {
  render() {
    return (
      <Card style={{ backgroundColor: "#dbd7d7" }}>
        <CardBody>
          <CardTitle>Health Report</CardTitle>
        </CardBody>
      </Card>
    );
  }
}

export default Health;
