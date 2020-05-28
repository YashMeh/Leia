import React from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "shards-react";
import Chart from "react-apexcharts";
import "./PacketVis.css";
import { connect } from "react-redux";

class PacketVis extends React.Component {
  state = {
    options: {
      labels: ["HTTPS", "HTTP", "DNS", "FTP", "SSH", "SMTP"],
      legend: {
        show: false,
      },
      theme: {
        monochrome: {
          enabled: false,
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
            },
          },
        },
      ],
      fill: {
        //colors: ["#a8df65", "#99b898"],
      },
    },
  };

  render() {
    const { device } = this.props;
    return (
      <Card style={{ backgroundColor: "#dbd7d7" }}>
        <CardBody>
          <CardTitle>Distribution</CardTitle>
          {device === null ? (
            <div>Select a device</div>
          ) : (
            <Chart
              options={this.state.options}
              series={[
                device.https === undefined ? 0 : device.https.length,
                device.http === undefined ? 0 : device.http.length,
                device.dns === undefined ? 0 : device.dns.length,
                device.ftp === undefined ? 0 : device.ftp.length,
                device.ssh === undefined ? 0 : device.ssh.length,
                device.smtp === undefined ? 0 : device.smtp.length,
              ]}
              type="donut"
              height="180"
            />
          )}
        </CardBody>
      </Card>
    );
  }
}
const map_state_to_prop = (state) => {
  return {
    device: state.packet.selected_device,
  };
};
export default connect(map_state_to_prop)(PacketVis);
