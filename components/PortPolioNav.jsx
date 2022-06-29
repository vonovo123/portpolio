import { Card, Col, Row } from "antd";
import styles from "../styles/Portpolio.module.css";
import { useMemo, useState } from "react";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function PortPolioNav({ change }) {
  const [selNav, setSelNav] = useState(0);

  return (
    <div>
      <Row justify="end" className={styles.navigation}>
        <Col
          span={3}
          className={cx("nav", { sel: selNav === 0 })}
          onClick={() => {
            setSelNav(0);
            change(0);
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
            }}
          >
            HTML / CSS
          </h1>
        </Col>
        <Col
          span={3}
          className={cx("nav", { sel: selNav === 1 })}
          onClick={() => {
            setSelNav(1);
            change(1);
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
            }}
          >
            Vanilla JS
          </h1>
        </Col>
        <Col
          span={3}
          className={cx("nav", { sel: selNav === 2 })}
          onClick={() => {
            setSelNav(2);
            change(2);
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
            }}
          >
            Vue / Nuxt
          </h1>
        </Col>
        <Col
          span={3}
          className={cx("nav", { sel: selNav === 3 })}
          onClick={() => {
            setSelNav(3);
            change(3);
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
            }}
          >
            React / Next
          </h1>
        </Col>
      </Row>
    </div>
  );
}
