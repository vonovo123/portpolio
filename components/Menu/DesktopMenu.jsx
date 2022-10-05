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
}) {
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [subMenuInfoView, setSubMenuInfoView] = useState(null);
  const menuRef = useRef();
  useEffect(() => {
    if (!subMenuInfo) {
      setSubMenuInfoView(null);
      return;
    }
    setSubMenuInfoView([...subMenuInfo]);
  }, [subMenuInfo]);
  return (
    <div className={cx("menu", { hide: !subMenuInfoView })}>
      <div className={cx("mainMenuWrapper", { hide: !subMenuInfoView })}>
        <div className={cx("main")}>
          {menuInfo &&
            menuInfo.map(({ type, slug, name }, idx) => {
              return (
                <div
                  className={cx("nav", { sel: menu === slug })}
                  key={idx}
                  onClick={() => {
                    setMenu(slug);
                  }}
                >
                  {name}
                </div>
              );
            })}
        </div>
      </div>
      <div className={cx("subMenuWrapper", { hide: !subMenuInfoView })}>
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
