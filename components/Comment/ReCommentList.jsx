import styles from "../../styles/ReComment.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import { useEffect } from "react";
import ReComment from "./ReComment";
import { LoadingOutlined } from "@ant-design/icons";

export default function ReCommentList({
  reCommentListState,
  reCommentLoadingState,
}) {
  const [reCommentList, setReCommentList] = reCommentListState;
  const [reCommentLoading, setReCommentLoading] = reCommentLoadingState;
  useEffect(() => {}, [reCommentList]);
  return (
    <div className={cx("commentList")}>
      {reCommentLoading && (
        <div className={cx("loading")}>
          <LoadingOutlined />
        </div>
      )}
      {!reCommentLoading && (
        <div className={cx("commentListWrapper")}>
          {reCommentList && reCommentList.length === 0 && (
            <div className={cx("noReComment")}>
              {"댓글에 대한 답글을 작성해주세요."}
            </div>
          )}
          {reCommentList &&
            reCommentList.length > 0 &&
            reCommentList.map((comment, idx) => (
              <ReComment comment={comment} key={idx} idx={idx}></ReComment>
            ))}
        </div>
      )}
    </div>
  );
}
