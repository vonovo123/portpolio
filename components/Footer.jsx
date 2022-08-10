import { Col, Row } from "antd";

export default function Footer() {
  return (
    <Row
      align="middle"
      style={{ height: 100, textAlign: "right", paddingBottom: 100 }}
    >
      <Col span={20}>
        <p>@ 2022 Henry kwon. All right reserved.</p>
      </Col>
    </Row>
  );
}
