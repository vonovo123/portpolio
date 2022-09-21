import "antd/dist/antd.css";
import "../styles/reset.css";
import "../styles/globals.css";
import styles from "../styles/App.module.css";
import classNames from "classnames/bind";
import Menu from "../components/Menu";
import RecentPosts from "../components/RecentPosts";
import { useCallback, useEffect, useRef, useState } from "react";
import About from "../components/About";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LoadingOutlined, UpCircleOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // 뷰포트 화면 크기
  const [windowWidth, setWindowWidth] = useState(null);
  const [contentWidth, setContentWidth] = useState();

  //page 타입
  const pageState = useState(null);
  //메뉴 정보
  const menuInfoState = useState(null);
  const [menuInfo, setMenuInfo] = menuInfoState;
  const titleFoldState = useState(true);
  //메뉴 선택
  const menuState = useState(null);
  const contentRef = useRef(null);

  const initState = useCallback(() => {
    pageState[1](null);
    menuState[1](null);
    menuInfoState[1](null);
  }, [pageState, menuState, menuInfoState]);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setContentWidth(contentRef.current.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const goPage = useCallback(
    (def, val) => {
      initState();
      if (def === "home") {
        router.push({ pathname: "/", query: {} });
      } else if (def === "portpolios") {
        router.push({ pathname: "/page/portpolios", query: {} });
      } else if (def === "coding") {
        router.push({ pathname: "/page/coding", query: { menu: val } });
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
      <div className={cx("floatBtn")}>
        <UpCircleOutlined />
      </div>
      <div className={cx("about")}>
        <About profile={pageProps.profile[0]} />
      </div>
      <div className={cx("appWrapper")}>
        <div className={cx("header")}>
          <Header pageState={pageState} goPage={goPage}></Header>
          <Menu menuState={menuState} menuInfoState={menuInfoState} />
        </div>
        <div className={cx("body")} ref={contentRef}>
          <div className={cx("content")}>
            <Component
              {...pageProps}
              pageState={pageState}
              menuState={menuState}
              menuInfoState={menuInfoState}
              titleFoldState={titleFoldState}
              initState={initState}
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

export default MyApp;
