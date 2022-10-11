import classNames from "classnames/bind";
import styles from "../styles/index.module.css";
const cx = classNames.bind(styles);
import SanityService from "../services/SanityService";
import { useEffect, useState } from "react";
import Page from "./page/page";
import { useRouter } from "next/router";
import { setLocalData, getLocalData } from "../utils/LocalStorage";
import PostTitle from "../components/PostTitle";
import AdTop from "../components/AdBanner/AdTop";
export default function Home({
  cachedPathState,
  pageState,
  menuState,
  subMenuState,
  category,
  subCategoryState,
  goPage,
  setHideAbout,
  setMobileHeaderHide,
}) {
  const [page, setPage] = pageState;
  const [pageView, setPageView] = useState(null);
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [subCategory, setSubCategory] = subCategoryState;
  const [post, setPost] = useState(null);
  const [cachedPath, setCachedPath] = cachedPathState;
  const [loading, setLoading] = useState(null);
  const postTitleState = useState(null);
  const [postTitle, setPostTitle] = postTitleState;
  const router = useRouter();
  useEffect(() => {
    setMobileHeaderHide(true);
    const path = getLocalData("path");
    if (!path) {
      setCachedPath({ page: "post", menu: "home", subMenu: "recent" });
    } else {
      const { page, menu, subMenu } = path;
      if (page !== "post") {
        setCachedPath({ page: "post", menu: "home", subMenu: "recent" });
      } else {
        setCachedPath({
          page,
          menu,
          subMenu,
        });
      }
    }
    setHideAbout(false);
  }, []);

  useEffect(() => {
    if (!subMenu) return;
    async function fetchData() {
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
      } catch (error) {
        goPage({ def: "home" });
      }
    }
    setLocalData("path", { page, menu, subMenu });
    if (page !== "post") {
      goPage({ def: page });
      return;
    }
    setMobileHeaderHide(true);
    if (category && subCategory) {
      const main = category.find((cat) => cat.slug === menu).name;
      const sub = subCategory.find((cat) => cat.type === subMenu).name;
      const newTitle = { main, sub };
      setPostTitle(newTitle);
    }
    fetchData();
  }, [subMenu]);
  useEffect(() => {
    setPageView(page);
  }, [post]);
  return (
    <>
      <AdTop></AdTop>
      <div className={cx("titleWrapper")}>
        <PostTitle postTitleState={postTitleState}></PostTitle>
      </div>
      <Page
        pageView={pageView}
        post={post}
        loading={loading}
        goPage={goPage}
      ></Page>
    </>
  );
}

export async function getServerSideProps() {
  const sanityService = new SanityService();
  const profile = await sanityService.getProfile();
  const category = await sanityService.getCategory();
  const recentPost = await sanityService.getData({
    type: "post",
    category: null,
    subCategory: null,
  });
  return {
    props: {
      recentPost,
      profile,
      category,
    },
  };
}
