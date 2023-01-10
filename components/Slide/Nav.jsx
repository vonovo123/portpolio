import styles from "../../styles/Slide/Nav.module.css";
import classNames from "classnames/bind";
import { useRef } from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function Nav({ index, size, move, limitSize }) {
  const arrowRef = useRef(null);
  const drawDots = () => {
    const result = [];
    for (let i = 0; i < size; i++) {
      result.push(
        <div
          key={i}
          className={cx(
            "dot",
            { sel: i === index },
            {
              last:
                (size < limitSize && i === size - 1) ||
                (size >= limitSize && i % limitSize === limitSize - 1),
            }
          )}
          onClick={() => {
            move(i);
          }}
        ></div>
      );
    }
    return <div className={cx("dots")}>{result}</div>;
  };

  return (
    <div className={cx("navigation")}>
      <div className={cx("wrapper")} ref={arrowRef}>
        <div className={cx("arrow")}>
          {index > 0 && (
            <CaretLeftOutlined
              onClick={() => {
                move("prev");
              }}
            />
          )}
        </div>
        {drawDots()}
        <div className={cx("arrow")}>
          {index < size - 1 && (
            <CaretRightOutlined
              onClick={() => {
                move("next");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
