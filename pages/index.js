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
        subCategory: subMenu !== "default" ? subMenu : subCategory[0].type,
      };
      const sanityService = new SanityService();
      const post = await sanityService.getData(param);
      setLocalData("path", { page, menu, subMenu });
      setPost(post);
      setLoading(false);
    }
    fetchData();
  }, [subMenu]);
  useEffect(() => {
    setPageView(page);
  }, [post]);
  return (
    <Page
      pageView={pageView}
      post={post}
      loading={loading}
      goPage={goPage}
    ></Page>
  );
}

export async function getStaticProps({ query }) {
  console.log(query);
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
