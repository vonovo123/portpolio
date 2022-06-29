import { Chart } from "react-google-charts";
import { Card, Col, Row } from "antd";
export default function TestChart() {
  const rows = [
    [
      //"President",
      "George Washington",
      new Date(1789, 3, 30),
      new Date(1797, 2, 4),
    ],
    [
      //"President",
      "John Adams",
      new Date(1797, 2, 4),
      new Date(1801, 2, 4),
    ],
    [
      //"President",
      "Thomas Jefferson",
      new Date(1801, 2, 4),
      new Date(1809, 2, 4),
    ],
  ];

  const columns = [
    //{ type: "string", id: "Role" },
    { type: "string", id: "President" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ];
  const data = [columns, ...rows];
  return (
    <div>
      <Row align="middle" style={{ height: 80 }}>
        <Col span={24}>
          <h1
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            하나금융티아이
          </h1>
        </Col>
      </Row>
      <Chart
        chartType="Timeline"
        data={data}
        width="1000px"
        height="200px"
        //options={options}
        chartEvents={[
          {
            eventName: "ready",
            callback: ({ chartWrapper, google }) => {
              const chart = chartWrapper.getChart();
              console.log(chart);
              google.visualization.events.addListener(chart, "select", (e) => {
                const test = chart.getSelection();
                console.log(rows[test[0]["row"]]);
              });
            },
          },
        ]}
      ></Chart>
    </div>
  );
}
