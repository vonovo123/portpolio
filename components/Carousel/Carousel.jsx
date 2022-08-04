import { Row, Col } from "antd";
import { useCallback, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import CarouselElement from "./CarouselElement";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import styles from "../../styles/Carousel/Carousel.module.css";
import Dots from "./Dots";
const cx = classNames.bind(styles);
export default function Carousel({ slideData, startIndex }) {
  const slideRef = useRef(null);
  const elementRef = useRef(null);

  const [index, setIndex] = useState(startIndex);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);
  const handlePostResize = useCallback(() => {
    const { width } = elementRef.current.getBoundingClientRect();
    slideRef.current.style.transform = `translate3d(${-width * index}px, 0, 0)`;
  }, [slideRef, elementRef]);

  useEffect(() => {
    handlePostResize();
  }, []);
  useEffect(() => {
    window.removeEventListener("resize", handlePostResize);
    window.addEventListener("resize", handlePostResize);
    return () => window.removeEventListener("resize", handlePostResize);
  }, [handlePostResize]);

  const moveSlide = useCallback(
    (dir) => {
      const nextIdx = index + dir;
      const { width } = elementRef.current.getBoundingClientRect();
      slideRef.current.style.transition = `${0.5}s ease-out`;
      slideRef.current.style.transform = `translate3d(${
        -width * nextIdx
      }px, 0, 0)`;
      setIndex(nextIdx);
      if (nextIdx === startIndex * 2 || nextIdx === 0) {
        setTimeout(() => {
          nextIdx = startIndex;
          slideRef.current.style.transition = `${0}s ease-out`;
          slideRef.current.style.transform = `translate3d(${
            -width * nextIdx
          }px, 0, 0)`;
          setIndex(nextIdx);
        }, 500);
      }
    },
    [index, startIndex]
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
      <Row align="middle">
        <Col
          xl={{ span: 1 }}
          lg={{ span: 1 }}
          md={{ span: 0 }}
          sm={{ span: 0 }}
          xs={{ span: 0 }}
          align={"left"}
        >
          {
            <CaretLeftOutlined
              className={cx("arrow")}
              onClick={() => {
                moveSlide(-1);
              }}
            />
          }
        </Col>
        <Col
          xl={{ span: 22 }}
          lg={{ span: 22 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <div className={cx("wrapper")}>
            <ul
              className={cx("slide")}
              ref={slideRef}
              onTouchStart={(e) => {
                touchStart(e);
              }}
              onTouchEnd={(e) => {
                touchEnd(e);
              }}
            >
              {slideData.map((element, idx) => {
                return (
                  <li
                    key={idx}
                    className={cx({ sel: idx === index + 2 })}
                    ref={elementRef}
                  >
                    <CarouselElement element={element}></CarouselElement>
                  </li>
                );
              })}
              {slideData.map((element, idx) => {
                return (
                  <li key={idx} className={cx({ sel: idx === index - 3 })}>
                    <CarouselElement element={element}></CarouselElement>
                  </li>
                );
              })}
              {slideData.map((element, idx) => {
                return (
                  <li key={idx} className={cx({ sel: idx + 8 === index })}>
                    <CarouselElement element={element}></CarouselElement>
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
        <Col
          xl={{ span: 1 }}
          lg={{ span: 1 }}
          md={{ span: 0 }}
          sm={{ span: 0 }}
          xs={{ span: 0 }}
          align={"right"}
        >
          {
            <CaretRightOutlined
              className={cx("arrow")}
              onClick={() => {
                moveSlide(1);
              }}
            />
          }
        </Col>
        <Col span={24} className={cx("dotsWrapper")}>
          <Dots index={index} size={startIndex}></Dots>
        </Col>
      </Row>
    </>
  );
}
