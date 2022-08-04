import styles from "../../styles/Post/Post.module.css";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import Carousel from "../Carousel/Carousel";

import { useRouter } from "next/router";
import {
  CaretLeftOutlined,
  RightOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import Title from "../Title";
import { Row, Col } from "antd";
const cx = classNames.bind(styles);
export default function PostPreview({ posts, view, width, show, postRef }) {
  const router = useRouter();

  const [postList, setPostsList] = useState([
    posts[1],
    posts[0],
    posts[1],
    posts[0],
    posts[1],
  ]);
  const goList = useCallback(() => {
    router.push(`/posts`);
  }, [router]);

  // const changeListType = () => {
  //   if (listType === "slide") {
  //     setListType("list");
  //     arrowRef.current.style.transition = `${0.5}s ease-out`;
  //     arrowRef.current.style.transform = `translate3d(${-300}px, 0, 0)`;
  //     postsRef.current.style.transition = `${0}s ease-out`;
  //     postsRef.current.style.transform = `translate3d(${0}px, 0, 0)`;
  //     postsRef.current.childNodes.forEach((child, idx) => {
  //       if (idx === 0) return;
  //       if (idx === 1) return;
  //       if (idx === 6) return;
  //       child.style.transform = `translate3d(${-width * (idx - 1)}px,0, 0)`;
  //       setTimeout(() => {
  //         child.style.transition = `${0.5}s ease-out`;
  //         child.style.transform = `translate3d(0,0,0)`;
  //       }, 50 * (idx - 1));
  //     });
  //   } else {
  //     postsRef.current.childNodes.forEach((child, idx) => {
  //       if (idx === 0) return;
  //       if (idx === 1) return;
  //       if (idx === 6) return;
  //       setTimeout(() => {
  //         child.style.transform = `translate3d(${-width * (idx - 1)}px,0, 0)`;
  //       }, 50 * (6 - idx));
  //     });

  //     setTimeout(() => {
  //       postsRef.current.childNodes.forEach((child, idx) => {
  //         if (idx === 0) return;
  //         if (idx === 1) return;
  //         if (idx === 6) return;
  //         child.style.transition = `none`;
  //         child.style.transform = `translate3d(0,0, 0)`;
  //       });
  //       setListType("slide");
  //       arrowRef.current.style.transform = `translate3d(${0}px, 0, 0)`;
  //       postsRef.current.style.transform = `translate3d(${
  //         -postElWidth * postIndex
  //       }px, 0, 0)`;
  //     }, 500);
  //   }
  // };

  return (
    <div
      className={cx("post", { sel: view === "post" })}
      ref={postRef}
      data-idx="post"
    >
      <Row className={cx("info", { hide: !show })}>
        <Col className={cx("titleWrapper")}>
          <Title
            view={view}
            type={"post"}
            title={"최근 글"}
            show={show}
          ></Title>
        </Col>
        <Col
          className={cx("moveText", { sel: view === "post" })}
          onClick={goList}
        >
          {"전체보기"} <RightOutlined />
        </Col>
        <Carousel slideData={postList} startIndex={5}></Carousel>
      </Row>
    </div>
  );
}
