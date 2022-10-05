import styles from "../../styles/DefaultPosts.module.css";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import List from "../List";
const cx = classNames.bind(styles);
export default function DefaultPosts({ post, goPage, title }) {
  const createPopularPostElement = useCallback(({ element, idx, goPage }) => {
    return (
      <div
        className={cx("post")}
        key={idx}
        onClick={() => {
          goPage({ def: "slug", slug: element.slug });
        }}
      >
        <div>
          {`${element.category.name} / ${element.subCategory.type} / ${element.title}`}
        </div>
      </div>
    );
  }, []);
  return (
    <div className={cx("posts")}>
      <div className={cx("title")}>{title}</div>
      <div className={cx("listWrapper")}>
        <List
          post={post}
          goPage={goPage}
          createElement={createPopularPostElement}
        ></List>
      </div>
    </div>
  );
}
