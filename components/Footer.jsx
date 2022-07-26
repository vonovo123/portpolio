import { Col, Row } from "antd";

export default function Footer() {
  return (
    <Row
      align="middle"
      style={{ height: 200, textAlign: "right", marginTop: 200 }}
    >
      <Col span={20}>
        <p>@ 2022 Henry kwon. All right reserved.</p>
      </Col>
    </Row>
  );
}
