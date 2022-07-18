import { Card, Col, Row } from "antd";
import styles from "../styles/Portpolio.module.css";
import { useMemo, useState } from "react";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function PortPolioNav({ change, view }) {
  const [selNav, setSelNav] = useState(0);

  return (
    <div>
      <Row className={styles.navigation}>
        <Col
          xl={{ span: 3 }}
          lg={{ span: 3 }}
          md={{ span: 3 }}
          sm={{ span: 5 }}
          xs={{ span: 5 }}
          className={cx(
            "nav",
            { sel: view === "portpolio" },
            { checked: selNav === 0 }
          )}
          onClick={() => {
            setSelNav(0);
            change(0);
          }}
        >
          HTML / CSS
        </Col>
        <Col
          xl={{ span: 3 }}
          lg={{ span: 3 }}
          md={{ span: 3 }}
          sm={{ span: 5 }}
          xs={{ span: 5 }}
          className={cx(
            "nav",
            { sel: view === "portpolio" },
            { checked: selNav === 1 }
          )}
          onClick={() => {
            setSelNav(1);
            change(1);
          }}
        >
          Vanilla JS
        </Col>
        <Col
          xl={{ span: 3 }}
          lg={{ span: 3 }}
          md={{ span: 3 }}
          sm={{ span: 5 }}
          xs={{ span: 5 }}
          className={cx(
            "nav",
            { sel: view === "portpolio" },
            { checked: selNav === 2 }
          )}
          onClick={() => {
            setSelNav(2);
            change(2);
          }}
        >
          Vue
        </Col>
        <Col
          xl={{ span: 3 }}
          lg={{ span: 3 }}
          md={{ span: 3 }}
          sm={{ span: 5 }}
          xs={{ span: 5 }}
          className={cx(
            "nav",
            { sel: view === "portpolio" },
            { checked: selNav === 3 }
          )}
          onClick={() => {
            setSelNav(3);
            change(3);
          }}
        >
          React
        </Col>
      </Row>
    </div>
  );
}
