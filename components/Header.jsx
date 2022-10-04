import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
import DesktopMenu from "./Menu/DesktopMenu";
import MobileMenu from "./Menu/MobileMenu";
import { MenuOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function Header({
  pageState,
  menuState,
  subMenuState,
  subMenuViewState,
  category,
  subCategory,
  goPage,
}) {
  const [page, setPage] = pageState;
  const [hide, setHide] = useState(true);
  const menuRef = useRef();

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
            goPage({ def: "home" });
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
          subMenuViewState={subMenuViewState}
          subMenuState={subMenuState}
          menuInfo={category}
          subMenuInfo={subCategory}
          goPage={goPage}
        />
      </div>
      <div className={cx("mobileMenuWrapper")} ref={menuRef}>
        <MobileMenu
          pageState={pageState}
          menuState={menuState}
          subMenuState={subMenuState}
          menuInfo={category}
          subMenuInfo={subCategory}
        />
      </div>
    </div>
  );
}
