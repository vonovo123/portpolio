import styles from "../../styles/RecentPosts.module.css";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import Carousel from "../Carousel/Carousel";
import CarouselElement from "../Carousel/CarouselElement";
const cx = classNames.bind(styles);
export default function RecentPosts({
  post,
  windowWidth,
  contentWidth,
  goSlug = { goSlug },
}) {
  const makeElement = useCallback(({ element, goPage }) => {
    return (
      <CarouselElement element={element} goPage={goPage}></CarouselElement>
    );
  }, []);
  return (
    <div className={cx("recentPosts")}>
      <span className={cx("title")}>{"최근 글"}</span>
      <div className={cx("carouselWrapper")}>
        <Carousel
          data={post}
          makeElement={makeElement}
          windowWidth={windowWidth}
          contentWidth={contentWidth}
          goSlug={goSlug}
        ></Carousel>
      </div>
    </div>
  );
}
