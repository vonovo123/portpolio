import styles from "../../styles/ReComment.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import ReComment from "./ReComment";

export default function ReCommentList({
  reCommentListState,
  reCommentLoadingState,
}) {
  const [reCommentList, setReCommentList] = reCommentListState;
  return (
    <div className={cx("commentList")}>
      <div className={cx("commentListWrapper")}>
        {reCommentList && reCommentList.length === 0 && (
          <div className={cx("noReComment")}>{"대댓글이 없습니다."}</div>
        )}
        {reCommentList &&
          reCommentList.length > 0 &&
          reCommentList.map((comment, idx) => (
            <ReComment comment={comment} key={idx} idx={idx}></ReComment>
          ))}
      </div>
    </div>
  );
}
