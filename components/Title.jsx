import { Col, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import styles from "../styles/Title.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Title({ view, type, show = true }) {
  return (
    <Row className={cx("titleWrapper", { hide: !show })}>
      <Col className={cx("titleText", { sel: view === type })} span={24}>
        <Row>
          <Col>{type.toUpperCase()}</Col>
          {/* <Col className={cx("titleArrow", { sel: view === type })}></Col> */}
        </Row>
      </Col>
    </Row>
  );
}
