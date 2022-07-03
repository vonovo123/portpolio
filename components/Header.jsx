import { Col, Row } from "antd";
import Link from "next/link";
import { CodeOutlined } from "@ant-design/icons";
import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Header({
  view,
  navClickEvent,
  type,
  backBtnMouseHoverEvent,
}) {
  return (
    <Row align="middle" span={24}>
      <Col
        span={15}
        onClick={() => {
          navClickEvent("home");
        }}
      >
        <div className={cx("nav", { sel: view === "home" })}>
          <CodeOutlined /> WFDL [Web Frontend Development Log]
        </div>
      </Col>
      <Col span={9} className={cx("navWrapper", { show: type === "index" })}>
        <Row style={{ textAlign: "center" }}>
          <Col
            span={6}
            onClick={() => {
              navClickEvent("career");
            }}
          >
            <div className={cx("nav", { sel: view === "career" })}>Career</div>
          </Col>
          <Col
            span={6}
            onClick={() => {
              navClickEvent("portpolio");
            }}
          >
            <div className={cx("nav", { sel: view === "portpolio" })}>
              Portpolio
            </div>
          </Col>
          <Col
            span={6}
            onClick={() => {
              navClickEvent("post");
            }}
          >
            <div className={cx("nav", { sel: view === "post" })}>Post</div>
          </Col>
          <Col
            span={6}
            onClick={() => {
              navClickEvent("about");
            }}
          >
            <div className={cx("nav", { sel: view === "about" })}>About</div>
          </Col>
        </Row>
      </Col>
      <Col span={9} className={cx("navWrapper", { show: type === "detail" })}>
        <Row style={{ textAlign: "center" }}>
          <Col
            span={24}
            onClick={() => {
              navClickEvent("detail");
            }}
            onMouseEnter={() => {
              backBtnMouseHoverEvent("detail");
            }}
            onMouseLeave={() => {
              backBtnMouseHoverEvent("home");
            }}
          >
            <div className={cx("nav", { sel: view === "detail" })}>Back</div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
