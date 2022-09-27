import SanityService from "../../services/SanityService";
import { useMemo, useState } from "react";
import CareerListElement from "../../components/Element/CareerListElement";
import Page from "./page";
export default function Career({
  careers,
  pageState,
  menuState,
  menuInfoState,
}) {
  const careerListState = useState([]);
  const careerMenuInfo = useMemo(
    () => ({
      career: "Career",
    }),
    []
  );
  const makeElement = (element, idx) => {
    return <CareerListElement element={element} key={idx} />;
  };
  return (
    <Page
      post={careers}
      pageState={pageState}
      menuState={menuState}
      menuInfoState={menuInfoState}
      postListState={careerListState}
      initPage={"career"}
      initMenu={"career"}
      initMenuInfo={careerMenuInfo}
      makeElement={makeElement}
    ></Page>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const careers = await sanityService.getCareer();
  const profile = await sanityService.getProfile();
  const recentPost = await sanityService.getPost();
  return {
    props: {
      profile,
      careers,
      recentPost,
    },
  };
}
