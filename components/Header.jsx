import { Col, Row } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  CodeOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import styles from "../styles/Header.module.css";

import classNames from "classnames/bind";
import { createRef, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "../styles/transition/fade.module.css";
import Router, { useRouter } from "next/router";
const cx = classNames.bind(styles);
export default function Header({
  view,
  navClickEvent,
  type,
  title = "Web Frontend Development Log",
  backBtnMouseHoverEvent,
  width,
}) {
  const router = useRouter();
  const nodeRef = useRef(null);
  const [fold, setFold] = useState(true);
  const changeFold = () => {
    setFold(!fold);
  };
  const goBack = () => {
    Router.back();
  };
  return (
    <>
      {width >= 767 && (
        <div className={cx("header")}>
          <Row align="middle" className={styles.index}>
            <Col
              offset={1}
              span={15}
              onClick={() => {
                navClickEvent("home");
              }}
              style={{ cursor: "pointer" }}
            >
              <div className={cx("title", { sel: view === "home" })}>
                <CodeOutlined /> {title}
              </div>
            </Col>
            <Col
              span={8}
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
                <Col
                  span={5}
                  onClick={() => {
                    navClickEvent("post");
                  }}
                >
                  <div className={cx("nav", { sel: view === "post" })}>
                    POST
                  </div>
                </Col>
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
              xl={{ span: 7 }}
              lg={{ span: 7 }}
              md={{ span: 7 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              className={cx("navWrapper", {
                show: type === "postDetail" || type === "postList",
              })}
            >
              <Row style={{ textAlign: "right" }}>
                <Col
                  span={24}
                  onClick={() => {
                    navClickEvent("");
                  }}
                  onMouseEnter={() => {
                    backBtnMouseHoverEvent("");
                  }}
                  onMouseLeave={() => {
                    backBtnMouseHoverEvent("home");
                  }}
                >
                  <div
                    className={cx("nav", { sel: view === "" })}
                    style={{ fontWeight: "bold", fontSize: 25 }}
                  >
                    <RollbackOutlined onClick={goBack} />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
      {width < 767 && (
        <div className={cx("headWrapper")}>
          {type === "index" && (
            <div
              className={cx("header", { unfold: !fold })}
              onClick={changeFold}
            >
              <CSSTransition
                in={fold}
                classNames={fadeTransition}
                timeout={0}
                mountOnEnter
                nodeRef={nodeRef}
              >
                <Row span={24} ref={nodeRef}>
                  <Col span={20} style={{ marginTop: 5 }}>
                    <div className={cx("nav", "sel")}>
                      {view === "home" && <>Web Frontend Development Log</>}
                      {view === "career" && <>CAREER</>}
                      {view === "portpolio" && <>PORTPOLIO</>}
                      {view === "post" && <>POST</>}
                      {view === "about" && <>ABOUT</>}
                    </div>
                  </Col>
                  <Col
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginTop: 2,
                    }}
                    span={4}
                  >
                    <CaretDownOutlined />
                  </Col>
                </Row>
              </CSSTransition>
              <CSSTransition
                in={!fold}
                classNames={fadeTransition}
                timeout={0}
                mountOnEnter
              >
                <Row span={24} className={styles.index}>
                  <Col
                    span={20}
                    style={{ marginTop: 2 }}
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
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      marginTop: 2,
                    }}
                    span={4}
                  >
                    <CaretUpOutlined onClick={changeFold} />
                  </Col>
                  <Col
                    span={24}
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
                    onClick={() => {
                      navClickEvent("portpolio");
                      setFold(true);
                    }}
                  >
                    <div className={cx("nav", { sel: view === "portpolio" })}>
                      PORTPOLIO
                    </div>
                  </Col>
                  <Col
                    span={24}
                    onClick={() => {
                      navClickEvent("post");
                      setFold(true);
                    }}
                  >
                    <div className={cx("nav", { sel: view === "post" })}>
                      POST
                    </div>
                  </Col>
                  <Col
                    span={24}
                    onClick={() => {
                      navClickEvent("about");
                      setFold(true);
                    }}
                  >
                    <div className={cx("nav", { sel: view === "about" })}>
                      ABOUT
                    </div>
                  </Col>
                </Row>
              </CSSTransition>
            </div>
          )}
          {(type === "postDetail" || type === "postList") && (
            <div className={cx("header")}>
              <Row align="middle" span={24} className={styles.index}>
                <Col span={3} style={{ fontWeight: "bold", fontSize: 20 }}>
                  <RollbackOutlined onClick={goBack} />
                </Col>
                <Col span={20}>
                  <div className={cx("nav")} style={{ textAlign: "center" }}>
                    {title}
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      )}
    </>
  );
}
