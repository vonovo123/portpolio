import SanityService from "../../services/SanityService";
import { useEffect, useState } from "react";
import PostListElement from "../../components/Element/PostListElement";
import Page from "./page";
import { useRouter } from "next/router";
export default function Coding({
  pageState,
  menuState,
  subMenuState,
  subCategory,
  goPage,
}) {
  const makeElement = (element, idx, goPage) => {
    return <PostListElement element={element} key={idx} goPage={goPage} />;
  };
  const router = useRouter();
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  useEffect(() => {
    setPage("info");
    setMenu("info");
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
        type: "post",
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
  const category = await sanityService.getCategory();
  const subCategory = await sanityService.getSubCategory("info");
  const recentPost = await sanityService.getData({
    type: "post",
    category: null,
    subCategory: null,
  });
  const profile = await sanityService.getProfile();
  return {
    props: {
      recentPost,
      profile,
      category,
      subCategory,
    },
  };
}
