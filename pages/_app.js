import "antd/dist/antd.css";
import "../styles/reset.css";
import "../styles/globals.css";
import styles from "../styles/App.module.css";
import classNames from "classnames/bind";
import Header from "../components/Header/Header";
import Title from "../components/Title";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import About from "../components/About";
import { Col, Row } from "antd";
import { CaretLeftOutlined, LeftOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
function MyApp({ Component, pageProps }) {
  //page 타임
  const typeState = useState(null);
  //헤더 선택 메뉴
  const menuState = useState(null);
  //헤더 서브 메뉴
  const subMenuState = useState(null);
  //화면 선택 메뉴
  const viewState = useState(null);
  //화면 서브 메뉴
  const subViewState = useState(null);
  const subTitleState = useState(null);
  // 뷰포트 화면 크기
  const [width, setWidth] = useState();
  const [showAbout, setShowAbout] = useState(false);
  const titleMenus = useMemo(
    () => ({
      home: {
        post: "최근 포스트",
        portpolio: "포트폴리오",
        career: "커리어",
      },
      posts: {
        dev: <BreadCrumb params={["포스트", "개발"]}></BreadCrumb>,
        life: <BreadCrumb params={["포스트", "일상"]}></BreadCrumb>,
        review: <BreadCrumb params={["포스트", "리뷰"]}></BreadCrumb>,
      },
    }),
    []
  );
  const headerMenus = useMemo(() => {
    return [
      {
        id: "post",
        name: "포스트",
        sub: [
          { id: "new", name: "NEW" },
          { id: "dev", name: "개발" },
          { id: "life", name: "일상" },
          { id: "review", name: "리뷰" },
        ],
      },
      {
        id: "portpolio",
        name: "포트폴리오",
        sub: [
          { id: "all", name: "ALL" },
          { id: "pub", name: "퍼블리싱" },
          { id: "js", name: "자바스크립트" },
          { id: "vue", name: "뷰" },
          { id: "react", name: "리엑트" },
        ],
      },
      { id: "career", name: "커리어", sub: [] },
    ];
  }, []);
  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("headerInner")}>
          <Header
            menuState={menuState}
            subMenuState={subMenuState}
            viewState={viewState}
            subViewState={subViewState}
            profile={pageProps.profile[0]}
            width={width}
            menus={headerMenus}
          />
        </div>
        <div className={cx("headerBtn")}>{"접기"}</div>
      </div>
      <div
        className={cx("about", { show: showAbout })}
        onClick={(e) => {
          setShowAbout(!showAbout);
        }}
      >
        <About profile={pageProps.profile[0]} show={showAbout} />
      </div>
      <div className={cx("title")}>
        <Title
          titleMenus={titleMenus}
          viewState={viewState}
          subViewState={subViewState}
          typeState={typeState}
          subTitleState={subTitleState}
        ></Title>
      </div>
      <div className={cx("container")}>
        <Component
          {...pageProps}
          width={width}
          typeState={typeState}
          menuState={menuState}
          viewState={viewState}
          subMenuState={subMenuState}
          subViewState={subViewState}
          subTitleState={subTitleState}
        />
      </div>
    </div>
  );
}
export default MyApp;
