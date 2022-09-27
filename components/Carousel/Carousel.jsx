import { Row, Col } from "antd";
import { useCallback, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/Carousel/Carousel.module.css";
import Touch from "../../utils/Touch";
import Nav from "./Nav";
const cx = classNames.bind(styles);
export default function Carousel({
  data,
  makeElement,
  windowWidth,
  contentWidth,
  goPage,
}) {
  const slideRef = useRef(null);
  const [size, setSize] = useState(0);
  const [limitSize, setLimitSize] = useState(4);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let size = data.length;
    const { width } = slideRef.current.getElementsByTagName("div")[0]
      ? slideRef.current.getElementsByTagName("div")[0].getBoundingClientRect()
      : 0;
    setWidth(width);
    let limitSize = 0;
    if (windowWidth < 768) {
      limitSize = 1;
    } else if (windowWidth < 992) {
      limitSize = 2;
    } else if (windowWidth < 1200) {
      limitSize = 4;
    } else {
      limitSize = 4;
    }
    if (size >= limitSize) {
      slideRef.current.style.transform = `translate3d(-${
        width * size
      }px, 0, 0)`;
    } else {
      slideRef.current.style.transform = `translate3d(-${0}px, 0, 0)`;
    }
    setLimitSize(limitSize);
    setSize(size);
    setIndex(size);
  }, [data, contentWidth]);

  const move = useCallback(
    (dir) => {
      const nextIdx = 0;
      if (dir === "prev") {
        nextIdx = index - 1;
      } else if (dir === "next") {
        nextIdx = index + 1;
      } else {
        nextIdx = size + dir;
      }
      slideRef.current.style.transition = `${0.5}s ease-out`;
      slideRef.current.style.transform = `translate3d(${
        -width * nextIdx
      }px, 0, 0)`;
      setIndex(nextIdx);
      if (nextIdx === size * 2 || nextIdx === 0) {
        setTimeout(() => {
          nextIdx = size;
          slideRef.current.style.transition = `${0}s ease-out`;
          slideRef.current.style.transform = `translate3d(${
            -width * nextIdx
          }px, 0, 0)`;
          setIndex(nextIdx);
        }, 500);
      }
    },
    [index, size, width]
  );

  return (
    <>
      <div className={cx("carouselWrapper")}>
        <div className={cx("carousel")}>
          <Row
            className={cx("row")}
            ref={slideRef}
            onTouchStart={(e) => {
              Touch.touchStart(e);
            }}
            onTouchEnd={(e) => {
              Touch.touchEnd(e, move);
            }}
          >
            {(size >= limitSize || windowWidth < 767) &&
              data.map((element, idx) => {
                return (
                  <Col key={idx} className={cx("col")}>
                    {makeElement(element, goPage)}
                  </Col>
                );
              })}
            {data.map((element, idx) => {
              return (
                <Col key={idx} className={cx("col")}>
                  {makeElement(element, goPage)}
                </Col>
              );
            })}
            {(size >= limitSize || windowWidth < 767) &&
              data.map((element, idx) => {
                return (
                  <Col key={idx} className={cx("col")}>
                    {makeElement(element, goPage)}
                  </Col>
                );
              })}
          </Row>
        </div>
        {/* <div className={cx("right")}></div> */}
      </div>
      {size >= limitSize && windowWidth > 767 && (
        <Nav index={index} size={size} move={move} limitSize={limitSize}></Nav>
      )}
    </>
  );
}
