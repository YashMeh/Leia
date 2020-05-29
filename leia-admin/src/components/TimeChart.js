import React from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "shards-react";
import { connect } from "react-redux";
import { receive_time_data_action } from "../_actions/Receivers";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  AreaChart,
  styler,
  Resizable,
} from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
class TimeChart extends React.Component {
  componentDidMount = () => {
    this.props.receive_time_data_action();
  };
  handleTrackerChanged = (t) => {
    this.setState({ tracker: t });
  };
  state = { tracker: null };
  render() {
    const date_length =
      this.props.device !== null && this.props.device.date_length.length > 0
        ? this.props.device.date_length
        : [[new Date().getTime(), 0]];

    date_length.sort((a, b) => {
      return a[0] - b[0];
    });
    console.log(date_length);
    const data = {
      name: "traffic",
      columns: ["time", "in"],
      points: date_length,
    };
    const trafficSeries = new TimeSeries(data);
    date_length.sort((a, b) => {
      return b[1] - a[1];
    });

    const maxe = date_length[0][1];
    console.log(trafficSeries);
    const upDownStyle = styler([
      { key: "in", color: "#0c9463" },
      { key: "out", color: "#9BB8D7" },
    ]);
    return (
      <Card style={{ backgroundColor: "#dbd7d7" }}>
        <CardBody>
          <CardTitle>Total Traffic (bps)</CardTitle>

          {this.props.device === null ? (
            <div>Select a device</div>
          ) : (
            <Resizable>
              <ChartContainer
                timeRange={trafficSeries.timerange()}
                width={1080}
                trackerPosition={this.state.tracker}
                onTrackerChanged={this.handleTrackerChanged}
              >
                <ChartRow height={150}>
                  <Charts>
                    <AreaChart
                      axis="traffic"
                      series={trafficSeries}
                      columns={{ up: ["in"] }}
                      style={upDownStyle}
                    />
                  </Charts>
                  <YAxis
                    id="traffic"
                    label="Traffic (bps)"
                    max={maxe}
                    absolute={true}
                    width="60"
                    type="linear"
                  />
                </ChartRow>
              </ChartContainer>
            </Resizable>
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
export default connect(map_state_to_prop, { receive_time_data_action })(
  TimeChart
);
