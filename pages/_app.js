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
import AdBottom from "../components/AdBanner/AdBottom";
import AdSide from "../components/AdBanner/AdSide";
import { setLocalData } from "../utils/LocalStorage";
import PostTitle from "../components/PostTitle";

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
  const [hideAbout, setHideAbout] = useState(true);
  // 케시 데이터 정보
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
  // 선택된 매뉴 타입
  const menuTypeState = useState(null);
  const [menuType, setMenuType] = menuTypeState;
  //선택된 하위 메뉴
  const subMenuState = useState(null);
  const [subMenu, setSubMenu] = subMenuState;
  // 모바일 헤더 숨김
  const mobileHeaderState = useState(true);
  const [mobileHeaderHide, setMobileHeaderHide] = mobileHeaderState;
  //네비정보
  const postTitleState = useState(null);
  const [postTitle, setPostTitle] = postTitleState;
  //포스팅 리스트
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(null);
  const initState = useCallback(() => {
    setPage(null);
    setMenuType(null);
    setMenu(null);
    setSubMenu(null);
    setLocalData("page", null);
    setLocalData("path", null);
    setPost(null);
    setPostTitle(null);
    setMobileHeaderHide(true);
  });
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setContentWidth(contentRef.current.getBoundingClientRect().width);
    setCategory(pageProps.category);
  }, []);
  const goPage = useCallback(() => {
    setPage(menuType);
    setLocalData("page", menuType);
    if (menuType === "post") {
      router.push({ pathname: `/` });
    } else {
      router.push({ pathname: `/${menuType}` });
    }
  });
  const goMain = useCallback(() => {
    if (page === "post") {
      setCachedPath({ page, menu: "home", subMenu: "recent" });
    } else {
      initState();
      router.push({ pathname: `/` });
    }
  }, [router, page, menu, subMenu]);

  const goSlug = useCallback(({ menu, slug }) => {
    setCachedPath({ page: "slug", menu, subMenu: null });
    router.push({ pathname: `/post/${slug}` });
  }, []);
  const fetchPostData = useCallback(async () => {
    setPost(null);
    const param = {
      type: page,
      category: menu,
      subCategory: subMenu,
    };
    setLoading(true);
    const sanityService = new SanityService();
    try {
      const post = await sanityService.getData(param);
      setPost(post);
      setLoading(false);
    } catch (error) {}
  }, [page, menu, subMenu]);

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
    if (!cachedPath) return;
    const { page, menu, subMenu } = cachedPath;
    setPage(page);
    setMenu(menu);
    setTimeout(() => {
      setSubMenu(subMenu);
    }, 1000);
    setLocalData("page", page);
    setLocalData("path", { menu, subMenu });
  }, [cachedPath]);

  useEffect(() => {
    if (!menu) return;
    setSubcategory(null);
    setSubMenu(null);
    async function fetchSubCategory() {
      const sanityService = new SanityService();
      const subCategory = await sanityService.getSubCategory(menu);
      setSubcategory(subCategory);
    }
    fetchSubCategory();
  }, [menu]);

  useEffect(() => {
    if (!subMenu) return;
    setMobileHeaderHide(true);
    setPostTitle(null);
    if (category && subCategory) {
      const main = category.find((cat) => cat.slug === menu).name;
      const sub = subCategory.find((cat) => cat.type === subMenu).name;
      const newTitle = { main, sub };
      setPostTitle(newTitle);
    }
    setLocalData("path", { menu, subMenu });
  }, [subMenu]);

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
            mobileHeaderState={mobileHeaderState}
            pageState={pageState}
            menuState={menuState}
            menuTypeState={menuTypeState}
            subMenuState={subMenuState}
            category={category}
            subCategory={subCategory}
            goMain={goMain}
          ></Header>
        </div>
        <div className={cx("body")} ref={contentRef}>
          <div className={cx("titleWrapper")}>
            <PostTitle postTitleState={postTitleState}></PostTitle>
          </div>
          <div className={cx("content")}>
            <Component
              {...pageProps}
              cachedPathState={cachedPathState}
              pageState={pageState}
              menuState={menuState}
              menuTypeState={menuTypeState}
              subMenuState={subMenuState}
              setMobileHeaderHide={setMobileHeaderHide}
              setHideAbout={setHideAbout}
              post={post}
              loading={loading}
              fetchPostData={fetchPostData}
              goPage={goPage}
              goSlug={goSlug}
            />
          </div>
          <div className={cx("side")}>
            <div className={cx("themePostsWrapper", "mb50")}>
              <DefaultPosts
                post={pageProps.popularPost}
                title={"많이 본 글"}
                goSlug={goSlug}
              ></DefaultPosts>
            </div>
            <AdSide></AdSide>
            <div className={cx("themePostsWrapper", "mb50")}>
              <DefaultPosts
                post={pageProps.recentPost}
                title={"같은 메뉴 다른 글"}
                goSlug={goSlug}
              ></DefaultPosts>
            </div>
          </div>
        </div>
        <AdBottom></AdBottom>
        <div className={cx("banner", "mb50")}>
          <RecentPosts
            post={pageProps.recentPost}
            windowWidth={windowWidth}
            contentWidth={contentWidth}
            goSlug={goSlug}
          />
        </div>
        <div className={cx("footer", "mb50")}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
