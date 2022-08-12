import styles from "../../styles/Post/Post.module.css";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import Carousel from "../Carousel/Carousel";
import Title from "../Title";
import { Row, Col } from "antd";
import CarouselElement from "./PostElement";
const cx = classNames.bind(styles);
export default function PostPreview({ posts, view, width }) {
  const makeElement = (element) => {
    return <CarouselElement element={element}></CarouselElement>;
  };
  const [postList, setPostsList] = useState([...posts]);

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
    <div className={cx("post", "mb10", { sel: view === "post" })}>
      <Row className={cx("header")}></Row>
      <Carousel
        slideData={postList}
        makeElement={makeElement}
        windowWidth={width}
      ></Carousel>
    </div>
  );
}
