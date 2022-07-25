import styles from "../styles/Posts.module.css";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";
import { Col, Row } from "antd";
import classNames from "classnames/bind";
import fadeTransition from "../styles/transition/fade.module.css";
import { useRef } from "react";
const cx = classNames.bind(styles);

export default function Menus({ menus, setMenu, menu, showMenu, setShowMenu }) {
  const nodeRef = useRef(null);
  return (
    <div className={cx("menuWrapper")}>
      <div
        className={cx("selMenu", { disable: showMenu })}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <div className={cx("selMenuText")}>{menu}</div>
        {!showMenu && <CaretDownOutlined className={cx("selMenuArrow")} />}
        {showMenu && <CaretUpOutlined className={cx("selMenuArrow")} />}
      </div>

      <div className={cx("categoryMenu")}>
        <CSSTransition
          in={showMenu}
          classNames={fadeTransition}
          timeout={500}
          mountOnEnter
          nodeRef={nodeRef}
        >
          <Row ref={nodeRef}>
            {menus.map((option, idx) => (
              <Col
                key={idx}
                span={24}
                className={cx("menu", { sel: option === menu })}
                onClick={() => {
                  setMenu(menus[idx]);
                  setShowMenu(false);
                }}
              >
                {option}
              </Col>
            ))}
          </Row>
        </CSSTransition>
      </div>
    </div>
  );
}
