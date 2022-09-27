import SanityService from "../../services/SanityService";
import { useMemo, useState } from "react";
import PostListElement from "../../components/Element/PostListElement";
import Page from "./page";
export default function Coding({
  devPost,
  pageState,
  menuState,
  menuInfoState,
  goPage,
}) {
  const codingListState = useState(null);
  const codingMenuInfo = useMemo(
    () => ({
      linux: "리눅스",
      typescript: "타입스크립트",
    }),
    []
  );
  const makeElement = (element, idx, goPage) => {
    return <PostListElement element={element} key={idx} goPage={goPage} />;
  };
  return (
    <Page
      goPage={goPage}
      post={devPost}
      pageState={pageState}
      menuState={menuState}
      menuInfoState={menuInfoState}
      postListState={codingListState}
      initPage={"coding"}
      initMenu={"linux"}
      initMenuInfo={codingMenuInfo}
      makeElement={makeElement}
    ></Page>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const recentPost = await sanityService.getPost();
  const devPost = await sanityService.getPost("dev");
  const profile = await sanityService.getProfile();
  return {
    props: {
      devPost,
      recentPost,
      profile,
    },
  };
}
