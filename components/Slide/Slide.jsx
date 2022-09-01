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
}) {
  const slideRef = useRef(null);
  const [size, setSize] = useState(0);
  const [limitSize, setLimitSize] = useState(4);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    let size = data.length;
    console.log(width);
    const { width } = slideRef.current
      .getElementsByTagName("div")[0]
      .getBoundingClientRect();
    setWidth(width);
    let limitSize = 0;
    if (windowWidth < 768) {
      limitSize = 1;
    } else if (windowWidth < 992) {
      limitSize = 2;
    } else if (windowWidth < 1200) {
      limitSize = 3;
    } else {
      limitSize = 4;
    }
    slideRef.current.style.transform = `translate3d(-${0}px, 0, 0)`;
    setLimitSize(limitSize);
    setSize(size);
    setIndex(0);
  }, [contentWidth]);

  const move = useCallback(
    (dir) => {
      const nextIdx = index + dir;
      if (dir === 1) {
        if (nextIdx >= limitSize) {
          slideRef.current.style.transition = `${0.5}s ease-out`;
          slideRef.current.style.transform = `translate3d(${
            -width * (nextIdx - (limitSize - 1))
          }px, 0, 0)`;
        }
      } else {
        if (nextIdx % limitSize === limitSize - 1) {
          slideRef.current.style.transition = `${0.5}s ease-out`;
          slideRef.current.style.transform = `translate3d(${
            -(width * limitSize) * Math.floor(nextIdx / limitSize)
          }px, 0, 0)`;
        }
      }
      setIndex(nextIdx);
    },
    [index, width, limitSize]
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
            {data.map((element, idx) => {
              return (
                <Col key={idx} className={cx("col")}>
                  {makeElement(element, idx === index)}
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      {<Nav index={index} size={size} move={move}></Nav>}
    </>
  );
}
