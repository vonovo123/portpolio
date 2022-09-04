import "antd/dist/antd.css";
import "../styles/reset.css";
import "../styles/globals.css";
import styles from "../styles/App.module.css";
import classNames from "classnames/bind";
import Menu from "../components/Header/Menu";
import Title from "../components/Title";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import About from "../components/About";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
function MyApp({ Component, pageProps }) {
  //page 타임
  const typeState = useState(null);
  //해더인포
  const menuInfoState = useState(null);
  //헤더 선택 메뉴
  const menuState = useState(null);
  //헤더 서브선택 메뉴
  const subMenuState = useState(null);
  //화면 선택 메뉴
  const viewState = useState(null);
  //화면 서브 메뉴
  const subViewState = useState(null);
  const mainTitleState = useState(null);
  const subTitleState = useState(null);
  // 뷰포트 화면 크기
  const [windowWidth, setWindowWidth] = useState(null);
  const [contentWidth, setContentWidth] = useState();
  const [showAbout, setShowAbout] = useState(false);
  const [menuFold, setMenuFold] = useState(false);
  const [changeMenu, setChangeMenu] = useState(null);

  const contentRef = useRef(null);
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setContentWidth(contentRef.current.getBoundingClientRect().width);
  }, []);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
  useEffect(() => {
    setTimeout(() => {
      setContentWidth(contentRef.current.getBoundingClientRect().width);
    }, 500);
  }, [menuFold]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("headerWrapper", { fold: menuFold })}>
        <div className={cx("header")}>{" 🛠️   뚝딱뚝딱 개발공간"}</div>
      </div>
      <div
        className={cx("aboutWrapper", { show: showAbout, fold: menuFold })}
        onClick={() => {
          setShowAbout(!showAbout);
        }}
      >
        <About profile={pageProps.profile[0]} show={showAbout} />
      </div>
      <div className={cx("menuWrapper", { fold: menuFold })}>
        <div className={cx("menuContent")}>
          <Menu
            menuState={menuState}
            subMenuState={subMenuState}
            viewState={viewState}
            subViewState={subViewState}
            profile={pageProps.profile[0]}
            menuInfoState={menuInfoState}
            typeState={typeState}
            changeMenu={changeMenu}
          />
        </div>
        <div className={cx("menuBtnWrapper", { fold: menuFold })}>
          <div
            className={cx("btn")}
            onClick={() => {
              setMenuFold(!menuFold);
            }}
          >
            {menuFold ? <CaretRightOutlined /> : <CaretLeftOutlined />}
          </div>
        </div>
      </div>
      <div className={cx("bodyWrapper", { fold: menuFold })}>
        <div className={cx("title", { fold: !menuFold })}>
          <div
            className={cx("btn")}
            onClick={() => {
              setMenuFold(!menuFold);
            }}
          >
            <CaretRightOutlined />
          </div>
          <Title
            mainTitleState={mainTitleState}
            subTitleState={subTitleState}
            setMenuFold={setMenuFold}
            menuFold={menuFold}
          ></Title>
        </div>
        <div className={cx("content")} ref={contentRef}>
          <Component
            {...pageProps}
            windowWidth={windowWidth}
            contentWidth={contentWidth}
            typeState={typeState}
            menuState={menuState}
            viewState={viewState}
            subMenuState={subMenuState}
            subViewState={subViewState}
            mainTitleState={mainTitleState}
            subTitleState={subTitleState}
            menuInfoState={menuInfoState}
            menuFold={menuFold}
          />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
