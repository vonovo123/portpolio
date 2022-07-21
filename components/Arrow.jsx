import styles from "../styles/Arrow.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
export default function Arrow({ arrowRef, click, postIndex, size }) {
  const drawDots = () => {
    const result = [];
    for (let i = 1; i <= size; i++) {
      result.push(
        <div key={i} className={cx("dot", { sel: i === postIndex })}></div>
      );
    }
    return result;
  };

  return (
    <div className={cx("arrowWrapper")}>
      <div className={cx("dotsWrapper")}>
        <div className={cx("dots")} ref={arrowRef}>
          <CaretLeftOutlined
            className={cx("arrow")}
            onClick={() => {
              click(-1);
            }}
          />
          {drawDots()}

          <CaretRightOutlined
            className={cx("arrow")}
            onClick={() => {
              click(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}
