import { Row, Col } from "antd";
import { useCallback, useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import styles from "../../styles/Carousel/Carousel.module.css";
import Dots from "./Dots";
const cx = classNames.bind(styles);
export default function Carousel({ slideData, makeElement, windowWidth }) {
  const slideRef = useRef(null);
  // const [data, setData] = useState([[slideData[0]]]);
  // console.log(data);
  const [size, setSize] = useState(0);
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);
  const initData = useCallback(() => {
    const { width } = slideRef.current
      .getElementsByTagName("li")[0]
      .getBoundingClientRect();
    const slideWidth = width * 3 * slideData.length;
    setWidth(width);
    setSize(slideData.length);
    setIndex(slideData.length);
    return slideWidth;
  }, [slideData, windowWidth]);
  const slideEffect = (slideWidth) => {
    slideRef.current.style.visibility = "hidden";
    slideRef.current.style.transition = `${0}s`;
    slideRef.current.style.transform = `translate3d(-${
      slideWidth * 3
    }px, 0, 0)`;
    setTimeout(() => {
      slideRef.current.style.visibility = "visible";
      slideRef.current.style.transition = `${0.5}s`;
      slideRef.current.style.transform = `translate3d(0, 0, 0)`;
    }, 500);
  };

  useEffect(() => {
    const slideWidth = initData();
    slideEffect(slideWidth);
    window.removeEventListener("resize", initData);
    window.addEventListener("resize", initData);
    return () => window.removeEventListener("resize", initData);
  }, [initData]);

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
      console.log(dx);
      dx > 0 ? moveSlide(-1) : moveSlide(1);
    },
    [moveSlide, touchPosition]
  );
  return (
    <>
      <Row align="center">
        {windowWidth < 767 && (
          <Col span={24} className={cx("dotsWrapper")}>
            <Dots index={index} size={size}></Dots>
          </Col>
        )}
        {size >= 4 && windowWidth >= 767 && (
          <Col span={1} className={cx("arrow")} align="left">
            {
              <CaretLeftOutlined
                onClick={() => {
                  moveSlide(-1);
                }}
              />
            }
          </Col>
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
            {(size >= 4 || windowWidth < 767) &&
              slideData.map((element, idx) => {
                return <li key={idx}>{makeElement(element)}</li>;
              })}
            {slideData.map((element, idx) => {
              return <li key={idx}>{makeElement(element)}</li>;
            })}
            {(size >= 4 || windowWidth < 767) &&
              slideData.map((element, idx) => {
                return <li key={idx}>{makeElement(element)}</li>;
              })}
          </ul>
        </Col>
        {size >= 4 && windowWidth >= 767 && (
          <Col span={1} align="right" className={cx("arrow")}>
            {
              <CaretRightOutlined
                onClick={() => {
                  moveSlide(1);
                }}
              />
            }
          </Col>
        )}
        {size >= 4 && windowWidth >= 767 && (
          <Col span={24} className={cx("dotsWrapper")}>
            <Dots index={index} size={size}></Dots>
          </Col>
        )}
      </Row>
    </>
  );
}
