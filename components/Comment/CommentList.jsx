import styles from "../../styles/Comment.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import { useEffect } from "react";
import Comment from "./Comment";

export default function CommentList({ commentListState }) {
  const [commentList, setCommentList] = commentListState;
  useEffect(() => {}, [commentList]);
  return (
    <div className={cx("commentList")}>
      {commentList && commentList.length === 0 && (
        <div>{"작성된 댓글이 없습니다."}</div>
      )}
      {commentList &&
        commentList.length > 0 &&
        commentList.map((comment, idx) => (
          <Comment comment={comment} key={idx} idx={idx}></Comment>
        ))}
    </div>
  );
}
