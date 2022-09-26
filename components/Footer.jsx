import { Col, Row } from "antd";

export default function Footer() {
  return (
    <Row
      align="middle"
      style={{
        height: 10,
        textAlign: "center",
        marginBottom: "130px",
      }}
    >
      <Col span={22}>
        <p>@ 2022 Henry kwon. All right reserved.</p>
      </Col>
    </Row>
  );
}
