import { Col, Row } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
const cx = classNames.bind(styles);
export default function Header({
  view,
  navClickEvent,
  type,
  backBtnMouseHoverEvent,
  width,
}) {
  const [fold, setFold] = useState(true);
  const changeFold = () => {
    setFold(!fold);
  };
  return (
    <>
      {width >= 767 && (
        <div className={cx("header")}>
          <Row align="middle" span={24} className={styles.index}>
            <Col
              span={15}
              onClick={() => {
                navClickEvent("home");
              }}
            >
              <div className={cx("title", { sel: view === "home" })}>
                <CodeOutlined /> WFDL [Web Frontend Development Log]
              </div>
            </Col>
            <Col
              span={9}
              className={cx("navWrapper", { show: type === "index" })}
            >
              <Row style={{ textAlign: "center" }}>
                <Col
                  span={6}
                  onClick={() => {
                    navClickEvent("career");
                  }}
                >
                  <div className={cx("nav", { sel: view === "career" })}>
                    CAREER
                  </div>
                </Col>
                <Col
                  span={8}
                  onClick={() => {
                    navClickEvent("portpolio");
                  }}
                >
                  <div className={cx("nav", { sel: view === "portpolio" })}>
                    PORTPOLIO
                  </div>
                </Col>
                {/* <Col
                  span={5}
                  onClick={() => {
                    navClickEvent("post");
                  }}
                >
                  <div className={cx("nav", { sel: view === "post" })}>
                    POST
                  </div>
                </Col> */}
                <Col
                  span={5}
                  onClick={() => {
                    navClickEvent("about");
                  }}
                >
                  <div className={cx("nav", { sel: view === "about" })}>
                    ABOUT
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              xl={{ span: 9 }}
              lg={{ span: 9 }}
              md={{ span: 9 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className={cx("navWrapper", { show: type === "detail" })}
            >
              <Row style={{ textAlign: "right" }}>
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
                  <div className={cx("nav", { sel: view === "detail" })}>
                    Back
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
      {width < 767 && (
        <div className={cx("header", { unfold: !fold })}>
          {fold && (
            <Row align="middle" span={24} className={styles.index}>
              <Col style={{ textAlign: "center" }} span={24}>
                <div className={cx("nav", "sel")}>
                  {view === "home" && <>Web Frontend Development Log</>}
                  {view === "career" && <>CAREER</>}
                  {view === "portpolio" && <>PORTPOLIO</>}
                  {/* {view === "post" && <>POST</>} */}
                  {view === "about" && <>ABOUT</>}
                </div>
              </Col>
              <Col
                style={{ textAlign: "center", fontSize: 20, marginTop: 2 }}
                span={24}
              >
                <CaretDownOutlined onClick={changeFold} />
              </Col>
            </Row>
          )}
          {!fold && (
            <Row align="middle" span={24} className={styles.index}>
              <Col
                span={24}
                style={{ textAlign: "center" }}
                onClick={() => {
                  navClickEvent("home");
                  setFold(true);
                }}
              >
                <div className={cx("nav", { sel: view === "home" })}>
                  Web Frontend Development Log
                </div>
              </Col>

              <Col
                span={24}
                style={{ textAlign: "center" }}
                onClick={() => {
                  navClickEvent("career");
                  setFold(true);
                }}
              >
                <div className={cx("nav", { sel: view === "career" })}>
                  CAREER
                </div>
              </Col>
              <Col
                span={24}
                style={{ textAlign: "center" }}
                onClick={() => {
                  navClickEvent("portpolio");
                  setFold(true);
                }}
              >
                <div className={cx("nav", { sel: view === "portpolio" })}>
                  PORTPOLIO
                </div>
              </Col>
              {/* <Col
                span={24}
                style={{ textAlign: "center" }}
                onClick={() => {
                  navClickEvent("post");
                  setFold(true);
                }}
              >
                <div className={cx("nav", { sel: view === "post" })}>Post</div>
              </Col> */}
              <Col
                span={24}
                style={{ textAlign: "center" }}
                onClick={() => {
                  navClickEvent("about");
                  setFold(true);
                }}
              >
                <div className={cx("nav", { sel: view === "about" })}>
                  ABOUT
                </div>
              </Col>
              <Col
                style={{ textAlign: "center", fontSize: 20, marginTop: 2 }}
                span={24}
              >
                <CaretUpOutlined onClick={changeFold} />
              </Col>
            </Row>
          )}
        </div>
      )}
    </>
  );
}
