import SanityService from "../../services/SanityService";
import { useEffect, useState } from "react";
import CareerListElement from "../../components/Element/CareerListElement";
import Page from "./page";
import { useRouter } from "next/router";
export default function Career({
  pageState,
  menuState,
  subMenuState,
  subCategory,
  goPage,
}) {
  const makeElement = (element, idx) => {
    return <CareerListElement element={element} key={idx} />;
  };
  const router = useRouter();
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  useEffect(() => {
    setPage("career");
    setMenu("career");
    setSubMenu(
      router.query.category ? router.query.category : subCategory[0].type
    );
  }, []);
  useEffect(() => {
    if (!subMenu) {
      return;
    }
    async function fetchData() {
      setLoading(true);
      setPost(null);
      const sanityService = new SanityService();
      const post = await sanityService.getData({
        type: "career",
        category: menu,
        subCategory: subMenu,
      });
      setPost([...post]);
      setLoading(false);
    }
    fetchData();
  }, [subMenu]);
  return (
    <Page
      goPage={goPage}
      post={post}
      loading={loading}
      makeElement={makeElement}
    ></Page>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const profile = await sanityService.getProfile();
  const category = await sanityService.getCategory();
  const subCategory = await sanityService.getSubCategory("career");
  const recentPost = await sanityService.getData({
    type: "post",
    category: null,
    subCategory: null,
  });
  return {
    props: {
      profile,
      recentPost,
      category,
      subCategory,
    },
  };
}
