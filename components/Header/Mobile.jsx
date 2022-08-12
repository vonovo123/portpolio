import classNames from "classnames/bind";
import { useState } from "react";
import styles from "../../styles/Header/Mobile.module.css";
import { Col, Row } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import About from "../About";
const cx = classNames.bind(styles);

export default function Mobile({
  type,
  view,
  goBack,
  navClickEvent,
  title,
  menus,
  profile,
}) {
  const [showAbout, setShowAbout] = useState(false);
  return (
    <>
      {type === "index" && (
        <>
          <div
            className={cx("about", { show: showAbout })}
            onClick={(e) => {
              setShowAbout(!showAbout);
              e.stopPropagation();
            }}
          >
            <About view={view} profile={profile} show={showAbout} />
          </div>
          <div className={cx("header")}>
            <Row className={cx("navWrapper")}>
              {menus.map((menu, idx) => (
                <Col
                  key={idx}
                  span={8}
                  onClick={() => {
                    navClickEvent(menu.id);
                  }}
                >
                  <div className={cx("nav", { sel: view === menu.id })}>
                    {menu.name}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
      {(type === "postDetail" || type === "postList") && (
        <div className={cx("header", "fold")}>
          <Row align="middle" span={24} className={styles.index}>
            <Col span={1} style={{ fontWeight: "bold", fontSize: 25 }}>
              <RollbackOutlined onClick={goBack} />
            </Col>
            <Col span={23}>
              <div className={cx("nav")} style={{ textAlign: "center" }}>
                {title}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}
