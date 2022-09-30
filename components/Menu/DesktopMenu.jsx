import styles from "../../styles/Menu/DesktopMenu.module.css";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function DesktopMenu({
  pageState,
  menuState,
  subMenuState,
  menuInfo,
  subMenuInfo,
  goPage,
}) {
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [subMenuInfoView, setSubMenuInfoView] = useState(null);
  const menuRef = useRef();
  useEffect(() => {
    menuRef.current.style.opacity = 0;
    menuRef.current.style.transform = `translate3d(0,-50px, 0)`;
    if (!subMenuInfo) return;
    setTimeout(() => {
      setSubMenuInfoView([...subMenuInfo]);
      menuRef.current.style.opacity = 1;
      menuRef.current.style.transform = `translate3d(0, 0px, 0)`;
    }, 500);
  }, [subMenuInfo]);
  return (
    <div className={cx("menu")}>
      <div className={cx("mainMenuWrapper")}>
        <div className={cx("main")}>
          {menuInfo.map(({ type, name }, idx) => {
            return (
              <div
                className={cx("nav", { sel: menu === type })}
                key={idx}
                onClick={() => {
                  if (menu === type) return;
                  goPage(type);
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
      <div className={cx("subMenuWrapper")}>
        <div ref={menuRef} className={cx("sub")}>
          {subMenuInfoView &&
            subMenuInfoView.map(({ type, name }, idx) => (
              <div
                className={cx("nav", { sel: subMenu === type })}
                key={type}
                onClick={() => {
                  setSubMenu(type);
                }}
              >
                <div className={cx("text")}>{name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
