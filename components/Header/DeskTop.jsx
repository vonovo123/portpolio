import { Col, Row } from "antd";
import { CodeOutlined, RollbackOutlined } from "@ant-design/icons";
import styles from "../../styles/Header.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
const cx = classNames.bind(styles);
export default function DeskTop({
  type,
  view,
  goBack,
  navClickEvent,
  title,
  menus,
}) {
  const [back, setBack] = useState(false);
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
            {type === "index" &&
              menus.map((menu, idx) => (
                <Col
                  key={idx}
                  span={24}
                  onClick={() => {
                    navClickEvent(menu);
                  }}
                >
                  <div className={cx("nav", { sel: view === menu })}>
                    {menu.toUpperCase()}
                  </div>
                </Col>
              ))}
            {(type === "postDetail" || type === "postList") && (
              <Col
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
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
