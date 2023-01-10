import "antd/dist/antd.css";
import "../styles/reset.css";
import "../styles/globals.css";
import { useCallback, useEffect, useRef, useState } from "react";

import RecentPosts from "../components/ThemePosts/RecentPosts";
import About from "../components/About";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UpCircleOutlined } from "@ant-design/icons";
import SanityService from "../services/SanityService";
import { setLocalData } from "../utils/LocalStorage";
import PostTitle from "../components/PostTitle";
import makeObserver from "../utils/Observer";
import Side from "../components/Side";

import classNames from "classnames/bind";
import styles from "../styles/App.module.css";
import HeadMeta from "../components/HeadMeta";
const cx = classNames.bind(styles);
export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // 뷰포트 화면 크기
  const [windowWidth, setWindowWidth] = useState(null);
  const [contentWidth, setContentWidth] = useState();
  const bodyRef = useRef(null);
  const upbtnRef = useRef(null);
  const [upBtnHide, setUpBtnHide] = useState(true);
  const showAboutState = useState(false);
  const [showAbout, setShowAbout] = showAboutState;
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

  //페이지 타입
  const pageViewState = useState(null);
  const [pageView, setPageView] = pageViewState;
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
    setContentWidth(bodyRef.current.getBoundingClientRect().width);
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

  const goSlug = useCallback(({ slug }) => {
    initState();
    router.push({ pathname: `/post/${slug}` });
  }, []);

  const fetchPostData = useCallback(async () => {
    setPost(null);
    const param = {
      type: page,
      category: menu,
      subCategory: subMenu,
    };
    window.scrollTo({
      top: bodyRef.current.offsetTop - 15,
      behavior: "smooth",
    });
    setLoading(true);
    const sanityService = new SanityService();
    try {
      const post = await sanityService.getData(param);
      setPost(post);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [page, menu, subMenu]);

  useEffect(() => {
    const option = {
      rootMargin: "-10% 0px -90% 0px",
    };
    const inCB = () => {
      setUpBtnHide(false);
    };
    const outCB = () => {
      setUpBtnHide(true);
    };
    makeObserver({ target: [bodyRef.current], option, inCB, outCB });
  }, [bodyRef.current]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

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
        ref={upbtnRef}
        className={cx("upBtn", { hide: upBtnHide })}
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
        className={cx("about", { show: showAbout })}
        onClick={() => {
          setShowAbout(!showAbout);
        }}
      >
        <About
          profile={pageProps.profile && pageProps.profile[0]}
          home={pageProps.home && pageProps.home[0]}
        />
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
            showAboutState={showAboutState}
            goMain={goMain}
          ></Header>
        </div>
        <div className={cx("body")} ref={bodyRef}>
          <div className={cx("content")}>
            <div className={cx("titleWrapper")}>
              <PostTitle postTitleState={postTitleState}></PostTitle>
            </div>
            {/* <AdTop></AdTop> */}
            <Component
              {...pageProps}
              cachedPathState={cachedPathState}
              pageState={pageState}
              menuState={menuState}
              menuTypeState={menuTypeState}
              pageViewState={pageViewState}
              subMenuState={subMenuState}
              setMobileHeaderHide={setMobileHeaderHide}
              postTitleState={postTitleState}
              post={post}
              loading={loading}
              fetchPostData={fetchPostData}
              goPage={goPage}
              goSlug={goSlug}
              home={pageProps.home && pageProps.home[0]}
            />
          </div>
          <div className={cx("side")}>
            <Side
              pageView={pageView}
              categoryPost={pageProps.categoryPost}
              popularPost={pageProps.popularPost}
              recentComment={pageProps.recentComment}
              goSlug={goSlug}
            ></Side>
          </div>
          {/* <AdBottom></AdBottom> */}

          <div className={cx("banner", "mb20")}>
            <RecentPosts
              post={pageProps.recentPost}
              windowWidth={windowWidth}
              contentWidth={contentWidth}
              goSlug={goSlug}
            />
          </div>
        </div>

        <div className={cx("footer", "mb50")}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
