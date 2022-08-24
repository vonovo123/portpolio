import { Col, Row } from "antd";

export default function Footer() {
  return (
    <Row
      align="middle"
      style={{
        height: 100,
        textAlign: "right",
        paddingTop: 150,
        paddingBottom: 50,
      }}
    >
      <Col span={22}>
        <p>@ 2022 Henry kwon. All right reserved.</p>
      </Col>
    </Row>
  );
}
