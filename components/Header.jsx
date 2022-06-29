import { Col, Row } from "antd";
import Link from "next/link";
import { CodeOutlined } from "@ant-design/icons";
import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Header({ view, moveScrollbyNav, showNav }) {
  return (
    <Row align="middle" span={24}>
      <Col
        span={15}
        onClick={() => {
          moveScrollbyNav("home");
        }}
      >
        <div className={cx("nav", { sel: view === "home" })}>
          <CodeOutlined /> WFDL [Web Frontend Development Log]
        </div>
      </Col>
      <Col span={9} className={cx("navWrapper", { hide: showNav === false })}>
        <Row style={{ textAlign: "center" }}>
          <Col
            span={6}
            onClick={() => {
              moveScrollbyNav("career");
            }}
          >
            <div className={cx("nav", { sel: view === "career" })}>Career</div>
          </Col>
          <Col
            span={6}
            onClick={() => {
              moveScrollbyNav("portpolio");
            }}
          >
            <div className={cx("nav", { sel: view === "portpolio" })}>
              Portpolio
            </div>
          </Col>
          {/* <Col
            span={6}
            onClick={() => {
              moveScrollbyNav("post");
            }}
          >
            <div className={cx("nav", { sel: view === "post" })}>Post</div>
          </Col> */}
          <Col
            span={6}
            onClick={() => {
              moveScrollbyNav("about");
            }}
          >
            <div className={cx("nav", { sel: view === "about" })}>About</div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
