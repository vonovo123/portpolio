import classNames from "classnames/bind";
import styles from "../styles/Page/List.module.css";
const cx = classNames.bind(styles);
export default function List({ dataList, title, createElement }) {
  return (
    <div className={cx("list")}>
      <div className={cx("title")}>{title}</div>
      <div className={cx("listWrapper")}>
        {dataList && dataList.length === 0 && (
          <div>{"표시할 내용이 없습니다."}</div>
        )}
        {dataList &&
          dataList.length > 0 &&
          dataList.map((element, idx) => createElement({ element, idx }))}
      </div>
    </div>
  );
}
