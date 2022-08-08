import { Card, Col, Row } from "antd";
import styles from "../../styles/PortpolioNav.module.css";
import { useState } from "react";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function PortPolioNav({ change, view }) {
  const [selNav, setSelNav] = useState(0);
  const menus = ["HTML / CSS", "Vanilla JS", "Vue", "React"];
  return (
    <Row className={styles.navigation}>
      {menus.map((menu, idx) => (
        <Col
          key={idx}
          span={6}
          className={cx(
            "nav",
            { sel: view === "portpolio" },
            { checked: selNav === idx }
          )}
          onClick={() => {
            setSelNav(idx);
            change(idx);
          }}
        >
          {menu}
        </Col>
      ))}
    </Row>
  );
}
