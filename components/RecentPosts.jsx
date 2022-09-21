import styles from "../styles/RecentPosts.module.css";
import SanityService from "../services/SanityService";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import Carousel from "./Carousel/Carousel";
import CarouselElement from "./Carousel/CarouselElement";
const cx = classNames.bind(styles);
export default function RecentPosts({
  recentPost,
  windowWidth,
  contentWidth,
  goPage,
}) {
  const makeElement = useCallback((element, goPage) => {
    return (
      <CarouselElement element={element} goPage={goPage}></CarouselElement>
    );
  }, []);
  const [postList, setPostsList] = useState([
    ...recentPost,
    ...recentPost,
    ...recentPost,
  ]);
  return (
    <div className={cx("recentPosts")}>
      <span className={cx("title")}>{"최근 글"}</span>
      <div className={cx("carouselWrapper")}>
        <Carousel
          data={postList}
          makeElement={makeElement}
          windowWidth={windowWidth}
          contentWidth={contentWidth}
          goPage={goPage}
        ></Carousel>
      </div>
    </div>
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
    },
  };
}
