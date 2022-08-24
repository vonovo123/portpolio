import { Row, Col } from "antd";
import { useCallback, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import styles from "../../styles/Carousel/Carousel.module.css";
import Nav from "./Nav";
const cx = classNames.bind(styles);
export default function Carousel({
  data,
  makeElement,
  windowWidth,
  contentWidth,
  infinite,
}) {
  const slideRef = useRef(null);
  const [size, setSize] = useState(0);
  const [limitSize, setLimitSize] = useState(4);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);
  useEffect(() => {
    let size = data.length;
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
    } else if (windowWidth >= 1200) {
      limitSize = 4;
    }
    if (size >= limitSize) {
      slideRef.current.style.transform = `translate3d(-${
        (width * 3 * size) / 3
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
      const nextIdx = index + dir;
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

  const touchStart = useCallback(
    (e) => {
      const { clientX, clientY } = e.touches[0];
      setTouchStartTime(e.timeStamp);
      setTouchPosition({ clientX, clientY });
    },
    [setTouchStartTime, setTouchPosition]
  );
  const touchEnd = useCallback(
    (e) => {
      const { clientX } = e.changedTouches[0];
      const dx = clientX - touchPosition.clientX;
      if (dx === 0) {
        return;
      }
      dx > 0 ? move(-1) : move(1);
    },
    [move, touchPosition]
  );
  return (
    <>
      <div className={cx("carouselWrapper")}>
        <div className={cx("carousel")}>
          <Row
            className={cx("row")}
            ref={slideRef}
            onTouchStart={(e) => {
              touchStart(e);
            }}
            onTouchEnd={(e) => {
              touchEnd(e);
            }}
          >
            {(size >= limitSize || windowWidth < 767) &&
              data.map((element, idx) => {
                return (
                  <Col key={idx} className={cx("col")}>
                    {makeElement(element)}
                  </Col>
                );
              })}
            {data.map((element, idx) => {
              return (
                <Col key={idx} className={cx("col")}>
                  {makeElement(element)}
                </Col>
              );
            })}
            {(size >= limitSize || windowWidth < 767) &&
              data.map((element, idx) => {
                return (
                  <Col key={idx} className={cx("col")}>
                    {makeElement(element)}
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      {size >= limitSize && <Nav index={index} size={size} move={move}></Nav>}
    </>
  );
}
