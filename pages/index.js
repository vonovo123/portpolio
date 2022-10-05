import classNames from "classnames/bind";
import styles from "../styles/index.module.css";
const cx = classNames.bind(styles);
import SanityService from "../services/SanityService";
import { useEffect, useState } from "react";
import Page from "./page/page";
import { useRouter } from "next/router";
import { setLocalData, getLocalData } from "../utils/LocalStorage";
export default function Home({
  cachedPathState,
  pageState,
  menuState,
  subMenuState,
  category,
  subCategoryState,
  goPage,
}) {
  const [page, setPage] = pageState;
  const [pageView, setPageView] = useState(null);
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [subCategory, setSubCategory] = subCategoryState;
  const [post, setPost] = useState(null);
  const [cachedPath, setCachedPath] = cachedPathState;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const path = getLocalData("path");
    if (!path) {
      setCachedPath({ page: "post", menu: "home", subMenu: "recent" });
    } else {
      const { page, menu, subMenu } = path;
      setCachedPath({
        page,
        menu,
        subMenu,
      });
    }
  }, []);

  useEffect(() => {
    if (!subMenu) return;
    setLoading(true);
    async function fetchData() {
      setPost(null);
      const param = {
        type: page,
        category: menu,
        subCategory: subMenu,
      };
      const sanityService = new SanityService();
      const post = await sanityService.getData(param);
      let mainCat = null;
      let subCat = null;
      if (category && subCategory) {
        mainCat = category.find((cat) => cat.slug === menu);
        subCat = subCategory.find((cat) => cat.type === subMenu);
        if (mainCat && subCat)
          setTitle(
            <>
              <div className={cx("title")}>{mainCat.name}</div>
              <div className={cx("title")}>{">"}</div>
              <div className={cx("title", "sub")}>{subCat.name}</div>
            </>
          );
        else setTitle(null);
      } else {
        setTitle(null);
      }
      setLocalData("path", { page, menu, subMenu });
      setPost(post);
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subMenu]);
  useEffect(() => {
    setPageView(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);
  return (
    <>
      <div className={cx("titleWrapper")}>{title && title}</div>
      <div className={cx("ad", "h100", "mb30")}>Ad Section</div>
      <Page
        pageView={pageView}
        post={post}
        loading={loading}
        goPage={goPage}
      ></Page>
    </>
  );
}

export async function getStaticProps({ query }) {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
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
