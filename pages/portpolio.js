import SanityService from "../services/SanityService";
import { useEffect, useState } from "react";
import Page from "./page/page";
import { setLocalData, getLocalData } from "../utils/LocalStorage";
export default function Home({
  cachedPathState,
  pageViewState,
  menuTypeState,
  subMenuState,
  post,
  loading,
  goPage,
  fetchPostData,
}) {
  const [menuType, setMenuType] = menuTypeState;
  const [subMenu, setSubMenu] = subMenuState;
  const [pageView, setPageView] = pageViewState;
  const [cachedPath, setCachedPath] = cachedPathState;
  useEffect(() => {
    let page = getLocalData("page");
    let path = getLocalData("path");
    if (!page || page !== "portpolio") {
      page = "portpolio";
      path = { menu: "portpolio", subMenu: "htmlCss" };
    }
    if (!path || !path.menu || !path.subMenu) {
      path = { menu: "portpolio", subMenu: "htmlCss" };
    }

    setCachedPath({
      page,
      ...path,
    });
    setMenuType("portpolio");
    setPageView("portpolio");
  }, []);
  useEffect(() => {
    if (!subMenu) return;
    if (menuType === "portpolio") {
      fetchPostData();
    } else {
      goPage();
    }
    return;
  }, [subMenu]);

  return (
    <>
      <Page pageView={pageView} post={post} loading={loading}></Page>
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
