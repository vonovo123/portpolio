import styles from "../../styles/Menu/MobileMenu.module.css";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function MobileMenu({
  pageState,
  menuState,
  menuTypeState,
  subMenuState,
  menuInfo,
  subMenuInfo,
}) {
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [menuType, setMenuType] = menuTypeState;
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
    <div className={cx("menu")}>
      <div className={cx("mainMenuWrapper", { hide: !subMenuInfoView })}>
        <div className={cx("mainMenu")}>
          {menuInfo &&
            menuInfo.map(({ type, name, slug }, idx) => {
              if (type === "recent") return;
              return (
                <div
                  className={cx("nav")}
                  key={idx}
                  onClick={() => {
                    setMenu(slug);
                    setMenuType(type);
                  }}
                >
                  {name}
                </div>
              );
            })}
        </div>
      </div>
      <div className={cx("subMenuWrapper", { hide: !subMenuInfoView })}>
        <div ref={menuRef} className={cx("subMenu")}>
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
