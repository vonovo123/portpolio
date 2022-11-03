import SanityService from "../services/SanityService";
import { useEffect, useState } from "react";
import Page from "./page/page";
import { setLocalData, getLocalData } from "../utils/LocalStorage";
import AdTop from "../components/AdBanner/AdTop";
import HeadMeta from "../components/HeadMeta";
export default function Home({
  cachedPathState,
  menuTypeState,
  pageViewState,
  subMenuState,
  post,
  loading,
  fetchPostData,
  goPage,
  goSlug,
  home,
}) {
  const [menuType, setMenuType] = menuTypeState;
  const [subMenu, setSubMenu] = subMenuState;
  const [pageView, setPageView] = pageViewState;
  const [cachedPath, setCachedPath] = cachedPathState;
  useEffect(() => {
    let page = getLocalData("page");
    let path = getLocalData("path");
    if (!page || page !== "post") {
      page = "post";
      path = { menu: "home", subMenu: "recent" };
    }
    if (!path || !path.menu || !path.subMenu) {
      path = { menu: "home", subMenu: "recent" };
    }

    setCachedPath({
      page,
      ...path,
    });
    setMenuType("post");
    setPageView("post");
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
      <HeadMeta image={home && home.thumbnail.imageUrl}></HeadMeta>
      <Page
        pageView={pageView}
        post={post}
        loading={loading}
        goSlug={goSlug}
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
    category: "home",
    subCategory: null,
  });
  const popularPost = await sanityService.getData({
    type: "popular",
    category: null,
    subCategory: null,
  });
  const home = await sanityService.getHome();
  const recentComment = await sanityService.getRecentComments();
  return {
    props: {
      recentPost,
      popularPost,
      profile,
      home,
      category,
      recentComment,
    },
  };
}
