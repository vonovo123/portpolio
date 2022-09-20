import styles from "../styles/Menu.module.css";
import classNames from "classnames/bind";
import { CloseOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function Menu({ menuState, menuInfoState }) {
  const [menu, setMenu] = menuState;
  const [menuInfo, setMenuInfo] = menuInfoState;
  const [menuInfoView, setMenuInfoView] = useState(null);
  const menuRef = useRef();
  useEffect(() => {
    menuRef.current.style.transform = `translate3d(0,-50px, 0)`;
    menuRef.current.style.opacity = 0;
    setTimeout(() => {
      setMenuInfoView({ ...menuInfo });
      menuRef.current.style.opacity = 1;
      menuRef.current.style.transform = `translate3d(0, 0px, 0)`;
    }, 1000);
  }, [menuInfo]);
  return (
    <div className={cx("menu")}>
      <div className={cx("menuWrapper")} ref={menuRef}>
        {menuInfoView &&
          Object.entries(menuInfoView).map(([key, value], idx) => (
            <div
              className={cx("nav", { sel: menu === key })}
              key={key}
              onClick={() => {
                setMenu(key);
              }}
            >
              <div className={cx("text")}>{value}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
