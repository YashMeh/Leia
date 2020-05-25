import React from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "shards-react";
import DataTable from "./DataTable";

class Overview extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Overview</CardTitle>
          <Container>
            <Row>
              <Col lg="12" sm="12">
                <DataTable />
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

export default Overview;
