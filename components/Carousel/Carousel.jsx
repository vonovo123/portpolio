import { Row, Col } from "antd";
import { useCallback, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import CarouselElement from "./CarouselElement";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import styles from "../../styles/Carousel/Carousel.module.css";
import Dots from "./Dots";
const cx = classNames.bind(styles);
export default function Carousel({ slideData, makeElement }) {
  const slideRef = useRef(null);
  const [size, setSize] = useState(0);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);
  const handlePostResize = useCallback(() => {
    if (slideData.length >= 5) {
      const { width } = slideRef.current
        .getElementsByTagName("li")[0]
        .getBoundingClientRect();
      slideRef.current.style.transition = `${0.0}s`;
      slideRef.current.style.visibility = "hidden";
      slideRef.current.style.transform = `translate3d(${
        -width * slideData.length * 3
      }px, 0, 0)`;
      setTimeout(() => {
        slideRef.current.style.visibility = "visible";
        slideRef.current.style.transition = `${0.5}s`;
        slideRef.current.style.transform = `translate3d(${
          -width * slideData.length
        }px, 0, 0)`;
      }, 300);

      setWidth(width);
      setSize(slideData.length);
      setIndex(slideData.length);
    } else {
      const { width } = slideRef.current
        .getElementsByTagName("li")[0]
        .getBoundingClientRect();
      setSize(slideData.length);
      setIndex(slideData.length);
      slideRef.current.style.transition = `${0}s`;
      slideRef.current.style.visibility = "hidden";
      slideRef.current.style.transform = `translate3d(${-width * 5}px, 0, 0)`;
      setTimeout(() => {
        slideRef.current.style.visibility = "visible";
        slideRef.current.style.transition = `${0.5}s`;
        slideRef.current.style.transform = `translate3d(0px, 0, 0)`;
      }, 500);
    }
  }, [slideData]);
  useEffect(() => {
    handlePostResize();
  }, [slideData]);
  useEffect(() => {
    window.removeEventListener("resize", handlePostResize);
    window.addEventListener("resize", handlePostResize);
    return () => window.removeEventListener("resize", handlePostResize);
  }, [handlePostResize]);

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
      <Row align="middle">
        {size > 5 && (
          <>
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
          </>
        )}
        <Col
          xl={{ span: 22 }}
          lg={{ span: 22 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
          className={cx("wrapper")}
        >
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
            {size > 5 &&
              slideData.map((element, idx) => {
                return <li key={idx}>{makeElement(element)}</li>;
              })}
            {slideData.map((element, idx) => {
              return <li key={idx}>{makeElement(element)}</li>;
            })}
            {size >= 5 &&
              slideData.map((element, idx) => {
                return <li key={idx}>{makeElement(element)}</li>;
              })}
          </ul>
        </Col>
        {size > 5 && (
          <>
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
          </>
        )}
        {size > 5 && (
          <Col span={24} className={cx("dotsWrapper")}>
            <Dots index={index} size={size}></Dots>
          </Col>
        )}
      </Row>
    </>
  );
}
