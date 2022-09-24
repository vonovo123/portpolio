import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
import DesktopMenu from "./Menu/DesktopMenu";
import MobileMenu from "./Menu/MobileMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function Header({
  goPage,
  pageState,
  menuState,
  menuInfoState,
}) {
  const [page, setPage] = pageState;
  const [hide, setHide] = useState(true);
  const menuRef = useRef();
  const headerMenuInfo = {
    coding: "개발",
    info: "정보",
    portpolios: "포트폴리오",
    career: "커리어",
  };
  useEffect(() => {
    if (hide) {
      menuRef.current.style.height = 0;
    } else {
      menuRef.current.style.height = "200px";
    }
  }, [hide]);
  return (
    <div className={cx("header")}>
      <div className={cx("titleWrapper")}>
        <div
          className={cx("title")}
          onClick={() => {
            if (page === "home") return;
            goPage("home");
          }}
        >
          {"Dynamic_Kwon"}
        </div>
        <div className={cx("innerMenu")}>
          <MenuOutlined
            onClick={() => {
              setHide(!hide);
            }}
          />
        </div>
      </div>
      <div className={cx("desktopMenuWrapper")}>
        <DesktopMenu
          pageState={pageState}
          menuState={menuState}
          menuInfoState={menuInfoState}
          headerMenuInfo={headerMenuInfo}
          goPage={goPage}
        />
      </div>
      <div className={cx("mobileMenuWrapper")} ref={menuRef}>
        <MobileMenu
          pageState={pageState}
          menuState={menuState}
          menuInfoState={menuInfoState}
          headerMenuInfo={headerMenuInfo}
          goPage={goPage}
        />
      </div>
    </div>
  );
}
