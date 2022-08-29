import styles from "../../styles/Post/Post.module.css";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import Carousel from "../Carousel/Carousel";
import Title from "../Title";
import { Row, Col } from "antd";
import PostElement from "./PostElement";
const cx = classNames.bind(styles);
export default function PostPreview({
  posts,
  windowWidth,
  contentWidth,
  makeSubTitle,
}) {
  const makeElement = useCallback((element) => {
    return <PostElement element={element}></PostElement>;
  }, []);
  const [postList, setPostsList] = useState([...posts]);
  return (
    <div className={cx("post")}>
      {makeSubTitle("post")}
      <div className={cx("carouselWrapper")}>
        <Carousel
          data={postList}
          makeElement={makeElement}
          windowWidth={windowWidth}
          contentWidth={contentWidth}
        ></Carousel>
      </div>
    </div>
  );
}
