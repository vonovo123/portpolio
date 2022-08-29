import { Col, Row } from "antd";
import styles from "../../styles/Header/Menu.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Menu({
  menuState,
  viewState,
  subMenuState,
  subViewState,
  menus,
  typeState,
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
                setMenu({ id: menuObj.id });
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
                        setSubMenu({ id: subMenuObj.id });
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
