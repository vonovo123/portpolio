import classNames from "classnames/bind";
import styles from "../styles/Page/List.module.css";
const cx = classNames.bind(styles);
export default function List({ dataList, title, createElement }) {
  return (
    <div className={cx("list")}>
      <div className={cx("title")}>{title}</div>
      <div className={cx("listWrapper")}>
        {dataList && dataList.length === 0 && (
          <div className={cx("empty")}>
            {"카테고리에 글이 존재하지 않습니다."}
          </div>
        )}
        {dataList &&
          dataList.length > 0 &&
          dataList.map((element, idx) => createElement({ element, idx }))}
      </div>
    </div>
  );
}
