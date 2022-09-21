import SanityService from "../services/SanityService";
import styles from "../styles/index.module.css";
import classNames from "classnames/bind";
import { useMemo, useState } from "react";
import Page from "./page/page";
import CodingListElement from "../components/Element/PostListElement";
const cx = classNames.bind(styles);

export default function Home({
  recentPost,
  pageState,
  menuState,
  menuInfoState,
  goPage,
}) {
  const postListState = useState(null);
  const [postList, setPostList] = postListState;

  const homeMenuInfo = useMemo(
    () => ({
      recent: "최근 글",
    }),
    []
  );
  const makeElement = (element, idx, goPage) => {
    return <CodingListElement element={element} key={idx} goPage={goPage} />;
  };
  return (
    <Page
      goPage={goPage}
      post={recentPost}
      pageState={pageState}
      menuState={menuState}
      menuInfoState={menuInfoState}
      postListState={postListState}
      initPage={"home"}
      initMenu={"recent"}
      initMenuInfo={homeMenuInfo}
      makeElement={makeElement}
    ></Page>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const recentPost = await sanityService.getDevPost();
  const profile = await sanityService.getProfile();
  return {
    props: {
      recentPost,
      profile,
    },
  };
}
