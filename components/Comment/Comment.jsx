import styles from "../../styles/Comment.module.css";
import classNames from "classnames/bind";
import dayjs from "dayjs";
const cx = classNames.bind(styles);
import { Image } from "antd";
import ReCommentList from "./ReCommentList";
import { useCallback, useEffect, useState } from "react";
import SanityService from "../../services/SanityService";
import ReCommentInput from "./ReCommentInput";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
export default function Comment({ comment, idx }) {
  const reCommentListState = useState(null);
  const [reCommentList, setReCommentList] = reCommentListState;
  const reCommentLoadingState = useState(false);
  const [reCommentLoading, setReCommentLoading] = reCommentLoadingState;
  const [showReComment, setShowReComment] = useState(false);
  const loadReComments = useCallback(async () => {
    const sanityService = new SanityService();
    setReCommentLoading(true);
    const result = await sanityService.getReCommentsById({ id: comment._id });
    setReCommentList([...result]);
    setReCommentLoading(false);
  }, [comment._id]);
  return (
    <div className={cx("comment")}>
      <div className={cx("commentWrapper")}>
        <div className={cx("commentDate")}>
          {dayjs(comment.createdAt).format("MMMM DD HH:mm:ss")}
        </div>
      </div>
      <div className={cx("commentWrapper")}>
        <div className={cx("imageWrapper")}>
          <Image
            className={cx("image")}
            src={`https://placedog.net/100/100/?id=${idx + 1}`}
            alt={"randomDog"}
            preview={false}
          />
        </div>
        <div className={cx("cotentWrapper")}>
          <div className={cx("commentName")}>
            {JSON.parse(comment.nickName)}
          </div>
          <div className={cx("commentTxt")}>{JSON.parse(comment.comment)}</div>
        </div>
      </div>

      <div className={cx("replyWrapper")}>
        <div
          className={cx("commentReplyCountWrapper")}
          onClick={() => {
            setShowReComment(!showReComment);
            if (!reCommentList) {
              loadReComments();
            }
          }}
        >
          <div className={cx("commentReplyCount")}>{`답글 보기`}</div>
          {!showReComment && (
            <DownCircleOutlined className={cx("commentReplyArrow")} />
          )}
          {showReComment && (
            <UpCircleOutlined className={cx("commentReplyArrow")} />
          )}
        </div>

        <div className={cx("commentReply", { hide: !showReComment })}>
          <ReCommentList
            reCommentListState={reCommentListState}
            reCommentLoadingState={reCommentLoadingState}
          ></ReCommentList>
          <ReCommentInput
            id={comment._id}
            reCommentListState={reCommentListState}
            // loadComments={loadComments}
          ></ReCommentInput>
        </div>
      </div>
    </div>
  );
}
