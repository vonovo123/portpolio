import styles from "../../styles/Menu/DesktopMenu.module.css";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function DesktopMenu({
  menuState,
  pageState,
  menuInfoState,
  headerMenuInfo,
  goPage,
}) {
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [menuInfo, setMenuInfo] = menuInfoState;
  const [menuInfoView, setMenuInfoView] = useState(null);
  const menuRef = useRef();
  useEffect(() => {
    menuRef.current.style.transform = `translate3d(0,-50px, 0)`;
    menuRef.current.style.opacity = 0;
    if (!menuInfo) return;
    setTimeout(() => {
      setMenuInfoView({ ...menuInfo });
      menuRef.current.style.opacity = 1;
      menuRef.current.style.transform = `translate3d(0, 0px, 0)`;
    }, 1000);
  }, [menuInfo]);
  return (
    <div className={cx("menu")}>
      <div className={cx("mainMenuWrapper")}>
        <div className={cx("mainMenu")}>
          {Object.entries(headerMenuInfo).map(([key, value], idx) => (
            <div
              className={cx("nav")}
              key={idx}
              onClick={() => {
                if (page === key) return;
                goPage(key);
              }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className={cx("subMenuWrapper")}>
        <div ref={menuRef} className={cx("subMenu")}>
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
    </div>
  );
}
