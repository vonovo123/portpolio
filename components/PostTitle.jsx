import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import styles from "../styles/PostTitle.module.css";
const cx = classNames.bind(styles);

export default function PostTitle({ postTitleState }) {
  const [postTitle, setPostTitle] = postTitleState;
  const titleRef = useRef();
  useEffect(() => {
    if (!postTitle)
      titleRef.current.style.transform = `translate3d(0, -70px, 0)`;
    else titleRef.current.style.transform = `translate3d(0, 0px, 0)`;
  }, [postTitle]);
  return (
    <div className={cx("titleWrapper")}>
      <div ref={titleRef} className={cx("titleInnerWrapper")}>
        {postTitle && (
          <>
            <div className={cx("title")}>{postTitle.main}</div>
            <div className={cx("title")}>{">"}</div>
            <div className={cx("title")}>{postTitle.sub}</div>
          </>
        )}
      </div>
    </div>
  );
}
