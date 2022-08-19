import { Row, Col } from "antd";
import { useCallback, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import styles from "../../styles/Carousel/Carousel.module.css";
import Dots from "./Dots";
const cx = classNames.bind(styles);
export default function Carousel({
  slideData,
  makeElement,
  windowWidth,
  contentWidth,
}) {
  const slideRef = useRef(null);
  const [size, setSize] = useState(0);
  const [limitSize, setLimitSize] = useState(4);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);
  let slideEffect = useCallback((slideWidth, size) => {}, [limitSize]);
  useEffect(() => {
    console.log("change");
    let size = slideData.length;
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
  }, [slideData, contentWidth]);
  useEffect(() => {}, [width]);

  const moveSlide = useCallback(
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
      dx > 0 ? moveSlide(-1) : moveSlide(1);
    },
    [moveSlide, touchPosition]
  );
  return (
    <>
      {size >= limitSize && (
        <div className={cx("navigation")}>
          {windowWidth < 767 && (
            <div className={cx("arrow")}>
              {
                <LeftCircleOutlined
                  onClick={() => {
                    moveSlide(-1);
                  }}
                />
              }
            </div>
          )}
          <div className={cx("dotsWrapper")}>
            <Dots index={index} size={size}></Dots>
          </div>
          {windowWidth < 767 && (
            <div className={cx("arrow")}>
              {
                <RightCircleOutlined
                  onClick={() => {
                    moveSlide(1);
                  }}
                />
              }
            </div>
          )}
        </div>
      )}
      <div className={cx("carouselWrapper")}>
        {size >= limitSize && windowWidth > 767 && (
          <div className={cx("arrow")} align="left">
            {
              <LeftCircleOutlined
                onClick={() => {
                  moveSlide(-1);
                }}
              />
            }
          </div>
        )}
        <div className={cx("carousel")}>
          <Row
            className={cx("slide")}
            ref={slideRef}
            onTouchStart={(e) => {
              touchStart(e);
            }}
            onTouchEnd={(e) => {
              touchEnd(e);
            }}
          >
            {(size >= limitSize || windowWidth < 767) &&
              slideData.map((element, idx) => {
                return (
                  <Col key={idx} className={cx("slideElement")}>
                    {makeElement(element)}
                  </Col>
                );
              })}
            {slideData.map((element, idx) => {
              return (
                <Col key={idx} className={cx("slideElement")}>
                  {makeElement(element)}
                </Col>
              );
            })}
            {(size >= limitSize || windowWidth < 767) &&
              slideData.map((element, idx) => {
                return (
                  <Col key={idx} className={cx("slideElement")}>
                    {makeElement(element)}
                  </Col>
                );
              })}
          </Row>
        </div>
        {size >= limitSize && windowWidth > 767 && (
          <Col align="right" className={cx("arrow")}>
            {
              <RightCircleOutlined
                onClick={() => {
                  moveSlide(1);
                }}
              />
            }
          </Col>
        )}
      </div>
    </>
  );
}
