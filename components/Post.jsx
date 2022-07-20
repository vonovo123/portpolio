import styles from "../styles/Post.module.css";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";
import PostList from "../components/PostList";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "../styles/transition/fade.module.css";
import {
  CaretLeftOutlined,
  RightOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import Title from "./Title";
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
      arrowRef.current.style.transform = `translate3d(${300}px, 0, 0)`;
      postsRef.current.style.transition = `${0}s ease-out`;
      postsRef.current.style.transform = `translate3d(${0}px, 0, 0)`;
    } else {
      setListType("slide");
      arrowRef.current.style.transform = `translate3d(${0}px, 0, 0)`;
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
    postsRef.current.style.transform = `translate3d(${
      -width * postIndex
    }px, 0, 0)`;
  }, []);

  return (
    <div
      className={cx("postList", { sel: view === "post" })}
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
      <div className={cx("arrowWrapper")}>
        <div className={cx("dotsWrapper")}>
          <div className={cx("dots")} ref={arrowRef}>
            <CaretLeftOutlined
              className={cx("arrow")}
              onClick={() => {
                changePost(-1);
              }}
            />

            {[1, 2, 3, 4, 5].map((v) => (
              <div
                key={v}
                className={cx("dot", { sel: v === postIndex })}
              ></div>
            ))}
            <CaretRightOutlined
              className={cx("arrow")}
              onClick={() => {
                changePost(1);
              }}
            />
          </div>
        </div>
        <>
          {listType === "slide" && (
            <CaretLeftOutlined
              className={cx("listArrow")}
              onClick={changeListType}
            />
          )}
          {listType === "list" && (
            <CaretDownOutlined
              className={cx("listArrow")}
              onClick={changeListType}
            />
          )}
        </>
      </div>
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
