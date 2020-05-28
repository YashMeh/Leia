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
    const { device, time_data } = this.props;
    time_data.sort((a, b) => {
      return a[0] - b[0];
    });
    console.log(time_data);
    const data = {
      name: "traffic",
      columns: ["time", "in"],
      points: time_data,
    };
    const trafficSeries = new TimeSeries(data);
    time_data.sort((a, b) => {
      return b[1] - a[1];
    });

    const maxe = time_data[0][1];
    console.log(trafficSeries);
    const upDownStyle = styler([
      { key: "in", color: "#0c9463" },
      { key: "out", color: "#9BB8D7" },
    ]);
    return (
      <Card style={{ backgroundColor: "#dbd7d7" }}>
        <CardBody>
          <CardTitle>Total Traffic (bps)</CardTitle>
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
        </CardBody>
      </Card>
    );
  }
}
const map_state_to_prop = (state) => {
  return {
    device: state.packet.selected_device,
    time_data: state.packet.time_data,
  };
};
export default connect(map_state_to_prop, { receive_time_data_action })(
  TimeChart
);
