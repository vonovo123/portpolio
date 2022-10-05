import classNames from "classnames/bind";
import styles from "../styles/Page/List.module.css";
const cx = classNames.bind(styles);
export default function List({ post, goPage, createElement }) {
  return (
    <div className={cx("list")}>
      <div className={cx("listWrapper")}>
        {post && post.length === 0 && <div>{"표시할 내용이 없습니다."}</div>}
        {post &&
          post.length > 0 &&
          post.map((element, idx) => createElement({ element, idx, goPage }))}
      </div>
    </div>
  );
}
