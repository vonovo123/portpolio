import styles from "../../styles/Carousel/Dots.module.css";
import classNames from "classnames/bind";
import { useRef } from "react";
const cx = classNames.bind(styles);
export default function Dots({ index, size }) {
  //10
  // 5 6 7 8 9
  // 0 1 2 3 4
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
    <div className={cx("dotsWrapper")}>
      <div className={cx("dots")} ref={arrowRef}>
        {drawDots()}
      </div>
    </div>
  );
}