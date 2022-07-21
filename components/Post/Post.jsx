import styles from "../../styles/Post/Post.module.css";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";
import PostList from "./PostList";
import Arrow from "../Arrow";
import { useRouter } from "next/router";
import {
  CaretLeftOutlined,
  RightOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import Title from "../Title";
import { Row, Col } from "antd";
const cx = classNames.bind(styles);
export default function PostPreview({ posts, view, width, show }) {
  const router = useRouter();
  const [postIndex, setPostIndex] = useState(1);
  const [listType, setListType] = useState("slide");

  const postsRef = useRef(null);
  const arrowRef = useRef(null);
  const goList = () => {
    router.push(`/posts`);
  };
  const changePost = (next) => {
    const { width } = postsRef.current.getBoundingClientRect();
    const nextIdx = postIndex + next;

    postsRef.current.style.transition = `${0.5}s ease-out`;
    postsRef.current.style.transform = `translate3d(${
      -width * nextIdx
    }px, 0, 0)`;

    if (nextIdx === 6) {
      nextIdx = 1;
      setTimeout(() => {
        postsRef.current.style.transition = `${0}s ease-out`;
        postsRef.current.style.transform = `translate3d(${
          -width * nextIdx
        }px, 0, 0)`;
      }, 500);
    }
    if (nextIdx === 0) {
      nextIdx = 5;
      setTimeout(() => {
        postsRef.current.style.transition = `${0}s ease-out`;
        postsRef.current.style.transform = `translate3d(${
          -width * nextIdx
        }px, 0, 0)`;
      }, 500);
    }
    setPostIndex(nextIdx);
  };
  const changeListType = () => {
    if (listType === "slide") {
      setListType("list");
      arrowRef.current.style.transition = `${0.5}s ease-out`;
      arrowRef.current.style.transform = `translate3d(${300}px, 0, 0)`;
      postsRef.current.style.transition = `${0}s ease-out`;
      postsRef.current.style.transform = `translate3d(${0}px, 0, 0)`;
      postsRef.current.childNodes.forEach((child, idx) => {
        if (idx === 0) return;
        if (idx === 1) return;
        if (idx === 6) return;
        child.style.transform = `translate3d(${-width * (idx - 1)}px,0, 0)`;
        setTimeout(() => {
          child.style.transition = `${0.5}s ease-out`;
          child.style.transform = `translate3d(0,0,0)`;
        }, 50 * (idx - 1));
      });
    } else {
      postsRef.current.childNodes.forEach((child, idx) => {
        if (idx === 0) return;
        if (idx === 1) return;
        if (idx === 6) return;
        setTimeout(() => {
          child.style.transform = `translate3d(${-width * (idx - 1)}px,0, 0)`;
        }, 50 * (6 - idx));
      });

      setTimeout(() => {
        postsRef.current.childNodes.forEach((child, idx) => {
          if (idx === 0) return;
          if (idx === 1) return;
          if (idx === 6) return;
          child.style.transition = `none`;
          child.style.transform = `translate3d(0,0, 0)`;
        });
        setListType("slide");
        arrowRef.current.style.transform = `translate3d(${0}px, 0, 0)`;
        const { width } = postsRef.current.getBoundingClientRect();
        postsRef.current.style.transform = `translate3d(${
          -width * postIndex
        }px, 0, 0)`;
      }, 500);
    }
  };
  const handlePostResize = useCallback(() => {
    if (listType === "list") return;
    const { width } = postsRef.current.getBoundingClientRect();
    postsRef.current.style.transform = `translate3d(${
      -width * postIndex
    }px, 0, 0)`;
  }, [listType, postsRef, postIndex]);
  useEffect(() => {
    window.removeEventListener("resize", handlePostResize);
    window.addEventListener("resize", handlePostResize);
    return () => window.removeEventListener("resize", handlePostResize);
  }, [listType, postIndex]);
  useEffect(() => {
    const { width } = postsRef.current.getBoundingClientRect();
    console.log(width);
    postsRef.current.style.transform = `translate3d(${
      -width * postIndex
    }px, 0, 0)`;
  }, []);

  return (
    <div
      className={cx("post", { sel: view === "post" })}
      id="post"
      data-idx="post"
    >
      <Title view={view} type={"post"} show={show}></Title>
      <div className={cx("info", { hide: !show })}>
        <div className={cx("infoText", { sel: view === "post" })}>
          최근 5개의 게시물
        </div>
        <div
          className={cx("moveText", { sel: view === "post" })}
          onClick={goList}
        >
          {"전체보기"} <RightOutlined />
        </div>
      </div>
      <Row className={cx("btns")}>
        <Col className={cx("listArrow")} onClick={changeListType} span={4}>
          {listType === "slide" ? "펼쳐보기" : "접어보기"}
        </Col>
        <Col
          className={cx("arrowWrapper")}
          xl={{ span: 7, offset: 13 }}
          lg={{ span: 7, offset: 13 }}
          md={{ span: 7, offset: 13 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Arrow
            arrowRef={arrowRef}
            click={changePost}
            postIndex={postIndex}
            size={5}
          ></Arrow>
        </Col>
      </Row>

      <PostList
        posts={posts}
        postsRef={postsRef}
        changePost={changePost}
        listType={listType}
        view={view}
        width={width}
      ></PostList>
    </div>
  );
}
