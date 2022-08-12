import { Col, Row } from "antd";
import { CodeOutlined, RollbackOutlined } from "@ant-design/icons";
import styles from "../../styles/Header/Desktop.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import About from "../About";
const cx = classNames.bind(styles);
export default function Desktop({
  type,
  view,
  goBack,
  navClickEvent,
  title,
  menus,
  profile,
}) {
  const [back, setBack] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const backBtnMouseHoverEvent = () => {
    setBack(!back);
  };
  return (
    <div className={cx("header")}>
      <Row align="middle" className={styles.index}>
        <Col
          span={24}
          onClick={() => {
            navClickEvent("post");
          }}
          style={{ cursor: "pointer" }}
        >
          <div className={cx("title")}>
            <CodeOutlined /> {title}
          </div>
        </Col>
        <Col span={24} className={cx("navWrapper")}>
          <Row style={{ textAlign: "center" }}>
            {menus.map((menu, idx) => (
              <Col
                key={idx}
                span={24}
                onClick={() => {
                  navClickEvent(menu.id);
                }}
              >
                <div className={cx("nav", { sel: view === menu.id })}>
                  {menu.name}
                </div>
              </Col>
            ))}
            {/* <Col
              span={24}
              onClick={() => {
                navClickEvent();
              }}
              onMouseEnter={() => {
                backBtnMouseHoverEvent();
              }}
              onMouseLeave={() => {
                backBtnMouseHoverEvent();
              }}
            >
              <div className={cx("nav", "back", { sel: back })}>
                <RollbackOutlined onClick={goBack} />
              </div>
            </Col> */}
          </Row>
        </Col>
        <Col
          className={cx("about", { show: showAbout })}
          onClick={(e) => {
            setShowAbout(!showAbout);
            e.stopPropagation();
          }}
        >
          <About view={view} profile={profile} show={showAbout} />
        </Col>
      </Row>
    </div>
  );
}
