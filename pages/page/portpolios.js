import SanityService from "../../services/SanityService";
import { useMemo, useState } from "react";
import PortpolioListElement from "../../components/Element/PortpolioListElement";
import Page from "./page";
export default function Portpolios({
  portpolios,
  pageState,
  menuState,
  menuInfoState,
}) {
  const portpolioListState = useState([]);
  const portMenuInfo = useMemo(
    () => ({
      htmlCss: "HTML/CSS",
      js: "VanillaJs",
      vue: "Vue",
      react: "React",
    }),
    []
  );
  const makeElement = (element, idx) => {
    return <PortpolioListElement element={element} key={idx} />;
  };
  return (
    <Page
      post={portpolios}
      pageState={pageState}
      menuState={menuState}
      menuInfoState={menuInfoState}
      postListState={portpolioListState}
      initPage={"portpolios"}
      initMenu={"htmlCss"}
      initMenuInfo={portMenuInfo}
      makeElement={makeElement}
    ></Page>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const portpolios = await sanityService.getPortpolio();
  const profile = await sanityService.getProfile();
  const recentPost = await sanityService.getPost();
  return {
    props: {
      portpolios,
      profile,
      recentPost,
    },
  };
}
