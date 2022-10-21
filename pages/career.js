import SanityService from "../services/SanityService";
import { useEffect, useState } from "react";
import Page from "./page/page";
import { setLocalData, getLocalData } from "../utils/LocalStorage";
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
}) {
  const [menuType, setMenuType] = menuTypeState;
  const [subMenu, setSubMenu] = subMenuState;
  const [pageView, setPageView] = pageViewState;
  const [cachedPath, setCachedPath] = cachedPathState;
  useEffect(() => {
    let page = getLocalData("page");
    let path = getLocalData("path");
    if (!page || page !== "career") {
      page = "career";
      path = { menu: "career", subMenu: "career" };
    }
    if (!path) path = { menu: "career", subMenu: "career" };
    setCachedPath({
      page,
      ...path,
    });
    setMenuType("career");
    setPageView("career");
  }, []);
  useEffect(() => {
    if (!subMenu) return;
    if (menuType === "career") {
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
        goSlug={goSlug}
      ></Page>
    </>
  );
}

export async function getServerSideProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
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
