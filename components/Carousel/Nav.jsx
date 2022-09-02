import styles from "../../styles/Carousel/Nav.module.css";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function Nav({ index, size, move, limitSize }) {
  const [autoMove, setAutoMove] = useState(null);
  useEffect(() => {
    // const interval = setInterval(() => {
    //   move("next");
    // }, 1000);
    // return interval;
  }, [index]);
  const arrowRef = useRef(null);
  const drawDots = () => {
    const result = [];
    let now = index % size;
    let range = [];
    let end = 0;
    for (let i = 0; i < limitSize; i++) {
      range.push((now + i) % size);
    }

    for (let i = 0; i < size; i++) {
      result.push(
        <div
          key={i}
          className={cx("dot", {
            sel: range.indexOf(i) !== -1,
          })}
        ></div>
      );
    }
    return result;
  };

  return (
    <div className={cx("navigation")}>
      <div className={cx("wrapper")} ref={arrowRef}>
        <div
          className={cx("arrow")}
          onClick={() => {
            move("prev");
          }}
        >
          {<CaretLeftOutlined />}
        </div>
        {drawDots()}
        <div
          className={cx("arrow")}
          onClick={() => {
            move("next");
          }}
        >
          {<CaretRightOutlined />}
        </div>
      </div>
    </div>
  );
}
