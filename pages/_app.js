import "antd/dist/antd.css";
import "../styles/reset.css";
import "../styles/globals.css";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "../styles/App.module.css";
import classNames from "classnames/bind";
import RecentPosts from "../components/ThemePosts/RecentPosts";
import DefaultPosts from "../components/ThemePosts/defaultPosts";
import About from "../components/About";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UpCircleOutlined } from "@ant-design/icons";
import SanityService from "../services/SanityService";
import { on, off, clear } from "../utils/Swing";
import { setLocalData } from "../utils/LocalStorage";
import AdBottom from "../components/AdBanner/AdBottom";
import AdSide from "../components/AdBanner/AdSide";

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
  const cachedPathState = useState(null);
  const [cachedPath, setCachedPath] = cachedPathState;
  // 메뉴 정보
  const categoryState = useState(null);
  const [category, setCategory] = categoryState;
  // 하위 메뉴 정보
  const subCategoryState = useState(null);
  const [subCategory, setSubcategory] = subCategoryState;
  //page 타입
  const pageState = useState(null);
  const [page, setPage] = pageState;
  //선택퇸 메뉴
  const menuState = useState(null);
  const [menu, setMenu] = menuState;
  //선택된 하위 메뉴
  const subMenuState = useState(null);
  const [subMenu, setSubMenu] = subMenuState;
  const initState = useCallback(() => {
    setPage(null);
    setMenu(null);
    setSubMenu(null);
    setSubcategory(null);
  }, [setPage, setMenu, setSubMenu]);

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setContentWidth(contentRef.current.getBoundingClientRect().width);
    setCategory(pageProps.category);
  }, []);
  const goPage = useCallback(
    ({ def, slug }) => {
      initState();
      if (def === "slug") {
        router.push({ pathname: `/post/${slug}` });
      } else if (def === "home") {
        if (page === "post") {
          setCachedPath({ page: "post", menu: "home", subMenu: "recent" });
        } else {
          setLocalData("path", null);
          router.push({ pathname: "/" });
        }
      } else {
        setLocalData("path", { page, menu, subMenu });
        router.push({ pathname: "/" });
      }
    },
    [initState, router, page, menu, subMenu]
  );

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
  useEffect(() => {
    if (!menu) return;
    if (menu === "portpolio" || menu === "career") {
      setPage(menu);
    } else {
      setPage("post");
    }
    setSubMenu(null);
    setSubcategory(null);
    async function fetchData() {
      const sanityService = new SanityService();
      const subCategory = await sanityService.getSubCategory(menu);
      setSubcategory(subCategory);
    }
    fetchData();
  }, [menu, setPage, setSubMenu, setSubcategory]);
  useEffect(() => {
    if (!cachedPath) return;
    setPage(cachedPath.page);
    setMenu(cachedPath.menu);
    setTimeout(() => {
      setSubMenu(cachedPath.subMenu);
    }, 1000);
  }, [cachedPath, setPage, setMenu, setSubMenu]);
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
        <About profile={pageProps.profile && pageProps.profile[0]} />
      </div>
      <div className={cx("appWrapper")}>
        <div className={cx("header")}>
          <Header
            pageState={pageState}
            menuState={menuState}
            subMenuState={subMenuState}
            category={category}
            subCategory={subCategory}
            goPage={goPage}
          ></Header>
        </div>
        <div className={cx("body")} ref={contentRef}>
          <div className={cx("content")}>
            <Component
              {...pageProps}
              cachedPathState={cachedPathState}
              category={category}
              subCategoryState={subCategoryState}
              pageState={pageState}
              menuState={menuState}
              subMenuState={subMenuState}
              initState={initState}
              setHideAbout={setHideAbout}
              goPage={goPage}
            />
          </div>
          <div className={cx("side")}>
            <div className={cx("themePostsWrapper", "mb50")}>
              <DefaultPosts
                post={pageProps.recentPost}
                goPage={goPage}
                title={"많이 본 글"}
              ></DefaultPosts>
            </div>
            <AdSide></AdSide>
            <div className={cx("themePostsWrapper", "mb50")}>
              <DefaultPosts
                post={pageProps.recentPost}
                goPage={goPage}
                title={"같은 메뉴 다른 글"}
              ></DefaultPosts>
            </div>
          </div>
        </div>
        <AdBottom></AdBottom>
        <div className={cx("banner", "mb50")} ref={contentRef}>
          <RecentPosts
            post={pageProps.recentPost}
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
