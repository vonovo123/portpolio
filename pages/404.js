import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "../styles/index.module.css";
const cx = classNames.bind(styles);
import AdTop from "../components/AdBanner/AdTop";
import PostTitle from "../components/PostTitle";
import SanityService from "../services/SanityService";

export default function Custom404({ pageState, subMenuState, goPage }) {
  const postTitleState = useState(null);
  const [page, setPage] = pageState;
  const [subMenu, setSubMenu] = subMenuState;
  const [postTitle, setPostTitle] = postTitleState;
  useEffect(() => {
    const newTitle = { main: "Error", sub: "404" };
    setPostTitle(newTitle);
  }, []);
  useEffect(() => {
    if (!subMenu) return;
    goPage({ def: page });
  }, [subMenu, goPage, page]);
  return (
    <>
      <AdTop></AdTop>
      <PostTitle postTitleState={postTitleState}></PostTitle>
      <div className={cx("e404")}>{"존재하지 않는 페이지입니다."}</div>
    </>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const profile = await sanityService.getProfile();
  const category = await sanityService.getCategory();
  const recentPost = await sanityService.getData({
    type: "post",
    category: "home",
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
