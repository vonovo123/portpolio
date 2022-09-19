import classNames from "classnames/bind";
import styles from "../styles/Page/List.module.css";
const cx = classNames.bind(styles);

export default function List({ list, makeElement, goPage }) {
  return (
    <div className={cx("listWrapper")}>
      {list.length === 0 && <div>{"표시할 내용이 없습니다."}</div>}
      {list.length > 0 &&
        list.map((element, idx) => makeElement(element, idx, goPage))}
    </div>
  );
}
