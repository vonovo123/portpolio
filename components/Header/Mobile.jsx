import classNames from "classnames/bind";
import { useState } from "react";
import styles from "../../styles/Header.module.css";
import { Col, Row } from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function Mobile({
  type,
  view,
  goBack,
  navClickEvent,
  title,
  menus,
}) {
  const [fold, setFold] = useState(true);

  const changeFold = () => {
    setFold(!fold);
  };
  return (
    <>
      {type === "index" && (
        <div className={cx("header", { fold: fold })}>
          <Row span={24}>
            <Col span={20} style={{ marginTop: 5 }}>
              <div className={cx("nav", "sel", { hide: !fold })}>
                {view.toUpperCase()}
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
              {fold && <CaretUpOutlined onClick={changeFold} />}
              {!fold && <CaretDownOutlined onClick={changeFold} />}
            </Col>
            <Row style={{ marginTop: 10 }}>
              {menus.map((menu, idx) => (
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
            </Row>
          </Row>
        </div>
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
