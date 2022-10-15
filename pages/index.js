import SanityService from "../services/SanityService";
import { useEffect, useState } from "react";
import Page from "./page/page";
import { setLocalData, getLocalData } from "../utils/LocalStorage";
import AdTop from "../components/AdBanner/AdTop";
export default function Home({
  cachedPathState,
  menuTypeState,
  subMenuState,
  setHideAbout,
  post,
  loading,
  fetchPostData,
  goPage,
  goSlug,
}) {
  const [menuType, setMenuType] = menuTypeState;
  const [subMenu, setSubMenu] = subMenuState;
  const [pageView, setPageView] = useState(null);
  const [cachedPath, setCachedPath] = cachedPathState;
  useEffect(() => {
    let page = getLocalData("page");
    let path = getLocalData("path");
    if (!page || page !== "post") {
      page = "post";
      path = { menu: "home", subMenu: "recent" };
    }
    if (!path) path = { menu: "home", subMenu: "recent" };
    setCachedPath({
      page,
      ...path,
    });
    setMenuType("post");
    setPageView("post");
    setHideAbout(false);
  }, []);
  useEffect(() => {
    if (!subMenu) return;
    if (menuType === "post") {
      fetchPostData();
    } else {
      goPage();
    }
    return;
  }, [subMenu]);

  return (
    <>
      <Page
        pageView={pageView}
        post={post}
        loading={loading}
        goPage={goSlug}
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
  const popularPost = await sanityService.getData({
    type: "popular",
    category: null,
    subCategory: null,
  });
  return {
    props: {
      recentPost,
      popularPost,
      profile,
      category,
    },
  };
}
