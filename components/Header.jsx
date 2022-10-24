import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
import DesktopMenu from "./Menu/DesktopMenu";
import MobileMenu from "./Menu/MobileMenu";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function Header({
  mobileHeaderState,
  pageState,
  menuState,
  menuTypeState,
  subMenuState,
  subMenuViewState,
  showAboutState,
  category,
  subCategory,
  goMain,
}) {
  const [page, setPage] = pageState;
  const menuRef = useRef();
  const [mobileHeaderHide, setMobileHeaderHide] = mobileHeaderState;
  const [showAbout, setShowAbout] = showAboutState;
  useEffect(() => {
    if (mobileHeaderHide) {
      menuRef.current.style.height = 0;
    } else {
      menuRef.current.style.height = "250px";
    }
  }, [mobileHeaderHide]);
  return (
    <div className={cx("header")}>
      <div className={cx("titleWrapper")}>
        <div
          className={cx("title")}
          onClick={() => {
            if (page === "home") return;
            goMain();
          }}
        >
          {"Dynamic_Kwon"}
        </div>
        <div
          className={cx("userInfo")}
          onClick={() => {
            setShowAbout(!showAbout);
          }}
        >
          <div>{"ABOUT"}</div>
        </div>
        <div className={cx("innerMenu")}>
          <MenuOutlined
            onClick={() => {
              setMobileHeaderHide(!mobileHeaderHide);
            }}
          />
        </div>
      </div>
      <div className={cx("desktopMenuWrapper")}>
        <DesktopMenu
          pageState={pageState}
          menuState={menuState}
          menuTypeState={menuTypeState}
          subMenuViewState={subMenuViewState}
          subMenuState={subMenuState}
          menuInfo={category}
          subMenuInfo={subCategory}
        />
      </div>
      <div className={cx("mobileMenuWrapper")} ref={menuRef}>
        <MobileMenu
          pageState={pageState}
          menuState={menuState}
          menuTypeState={menuTypeState}
          subMenuState={subMenuState}
          menuInfo={category}
          subMenuInfo={subCategory}
        />
      </div>
    </div>
  );
}
