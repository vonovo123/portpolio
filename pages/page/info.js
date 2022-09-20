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
  const infoListState = useState([]);
  const infoMenuInfo = useMemo(
    () => ({
      linux: "Linux",
      typescript: "Typescript",
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
      postListState={infoListState}
      initPage={"info"}
      initMenu={"linux"}
      initMenuInfo={infoMenuInfo}
      makeElement={makeElement}
    ></Page>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const recentPost = await sanityService.getDevPost();
  const devPost = await sanityService.getDevPost();
  const profile = await sanityService.getProfile();
  return {
    props: {
      devPost,
      recentPost,
      profile,
    },
  };
}
