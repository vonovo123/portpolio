import "antd/dist/antd.css";
import "../styles/reset.css";
import "../styles/globals.css";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/App.module.css";
import classNames from "classnames/bind";
import RecentPosts from "../components/RecentPosts";
import About from "../components/About";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UpCircleOutlined } from "@ant-design/icons";
import { on, off, clear } from "../utils/Swing";
const cx = classNames.bind(styles);
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // 뷰포트 화면 크기
  const [windowWidth, setWindowWidth] = useState(null);
  const [contentWidth, setContentWidth] = useState();
  const contentRef = useRef(null);
  const swing = useRef(null);
  const aboutRef = useRef(null);
  const [showAbout, setShowAbout] = useState(false);
  const [hideAbout, setHideAbout] = useState(false);
  //page 타입
  const pageState = useState(null);
  //메뉴 선택
  const menuState = useState(null);
  //하위 메뉴 선택
  const subMenuState = useState(null);
  const initState = useCallback(() => {
    pageState[1](null);
    menuState[1](null);
    subMenuState[1](null);
  }, [pageState, menuState, subMenuState]);

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
    if (!showAbout) {
      on(swing, aboutRef);
    } else {
      off(swing, aboutRef);
    }
    return () => {
      clear(swing);
    };
  }, [showAbout]);

  const goPage = useCallback(
    (def, val) => {
      initState();
      if (def === "home" || def === "recent") {
        router.push({ pathname: "/", query: {} });
      } else if (def === "portpolio") {
        router.push({ pathname: "/page/portpolios", query: {} });
      } else if (def === "dev") {
        router.push({ pathname: "/page/coding", query: { category: val } });
      } else if (def === "career") {
        router.push({ pathname: "/page/career", query: {} });
      } else if (def === "info") {
        router.push({ pathname: "/page/info", query: {} });
      } else if (def === "post") {
        router.push({ pathname: `/post/${val}` });
      }
    },
    [initState, router]
  );
  return (
    <div className={cx("app")}>
      <div
        className={cx("floatBtn")}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <UpCircleOutlined />
      </div>
      <div
        className={cx("about", { show: showAbout, hide: hideAbout })}
        onClick={() => {
          setShowAbout(!showAbout);
        }}
        ref={aboutRef}
      >
        <About profile={pageProps.profile[0]} />
      </div>
      <div className={cx("appWrapper")}>
        <div className={cx("header")}>
          <Header
            pageState={pageState}
            menuState={menuState}
            subMenuState={subMenuState}
            category={pageProps.category}
            subCategory={pageProps.subCategory}
            goPage={goPage}
          ></Header>
        </div>
        <div className={cx("body")} ref={contentRef}>
          <div className={cx("content")}>
            <Component
              {...pageProps}
              pageState={pageState}
              menuState={menuState}
              subMenuState={subMenuState}
              initState={initState}
              setHideAbout={setHideAbout}
              goPage={goPage}
            />
          </div>
          <div className={cx("side")}></div>
        </div>
        <div className={cx("banner", "mb50")} ref={contentRef}>
          <RecentPosts
            recentPost={pageProps.recentPost}
            windowWidth={windowWidth}
            contentWidth={contentWidth}
            goPage={goPage}
          />
        </div>
        <div className={cx("footer", "mb50")}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
