import styles from "../../styles/Carousel/Nav.module.css";
import classNames from "classnames/bind";
import { useRef } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function Nav({ index, size, move }) {
  const arrowRef = useRef(null);
  const drawDots = () => {
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(
        <div key={i} className={cx("dot", { sel: i === index % size })}></div>
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
            move(-1);
          }}
        >
          {<CaretLeftOutlined />}
        </div>
        {drawDots()}
        <div
          className={cx("arrow")}
          onClick={() => {
            move(1);
          }}
        >
          {<CaretRightOutlined />}
        </div>
      </div>
    </div>
  );
}
