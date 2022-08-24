import { Col, Row } from "antd";
import styles from "../../styles/Header/Desktop.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import About from "../About";
const cx = classNames.bind(styles);
export default function Desktop({
  menuState,
  viewState,
  subMenuState,
  subViewState,
  typeState,
  profile,
  menus,
  title,
}) {
  const [menu, setMenu] = menuState;
  const [view, setView] = viewState;
  const [subMenu, setSubMenu] = subMenuState;
  const [subView, setSubView] = subViewState;
  const [type, setType] = typeState;

  return (
    <Row className={cx("header")}>
      <Col span={24} className={cx("navWrapper")}>
        {menus.map((menuObj, idx) => (
          <div key={idx} span={24}>
            <div
              className={cx("nav", { sel: view === menuObj.id })}
              onClick={(e) => {
                setMenu(menuObj.id);
              }}
            >
              {menuObj.name}
            </div>
            <div className={cx("subNavWrapper")}>
              {menuObj.sub &&
                menuObj.sub.map((subMenuObj, idx) => {
                  if (subMenuObj.type !== "all" && subMenuObj.type !== type)
                    return;
                  return (
                    <div
                      key={idx}
                      className={cx("subNav", {
                        sel: subView === subMenuObj.id && menuObj.id === view,
                      })}
                      onClick={(e) => {
                        setSubMenu(subMenuObj.id);
                      }}
                    >
                      {subMenuObj.name}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </Col>
    </Row>
  );
}
