import styles from "../styles/SelectBox.module.css";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";
import { Col, Row } from "antd";
import classNames from "classnames/bind";
import fadeTransition from "../styles/Transition/fade.module.css";
import { useRef, useState } from "react";
const cx = classNames.bind(styles);

export default function SelectBox({ menus, menu, setMenu }) {
  const nodeRef = useRef(null);
  const [showMenuList, setShowMenuList] = useState(false);
  return (
    <div className={cx("boxWrapper")}>
      <div
        className={cx("selMenu", { disable: showMenuList })}
        onClick={() => {
          setShowMenuList(!showMenuList);
        }}
      >
        <div className={cx("selMenuText")}>
          {menu &&
            Object.entries(menus).find(([key, value]) => key === menu)[1]}
        </div>
        {!showMenuList && <CaretDownOutlined className={cx("selMenuArrow")} />}
        {showMenuList && <CaretUpOutlined className={cx("selMenuArrow")} />}
      </div>

      <div className={cx("categoryMenu")}>
        <CSSTransition
          in={showMenuList}
          classNames={fadeTransition}
          timeout={500}
          mountOnEnter
          nodeRef={nodeRef}
        >
          <Row ref={nodeRef}>
            {Object.entries(menus).map(([key, value], idx) => (
              <Col
                key={idx}
                span={24}
                className={cx("menu", { sel: key === menu })}
                onClick={() => {
                  setMenu({ id: key });
                  setShowMenuList(false);
                }}
              >
                {value}
              </Col>
            ))}
          </Row>
        </CSSTransition>
      </div>
    </div>
  );
}
