import styles from "../../styles/Comment.module.css";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import SanityService from "../../services/SanityService";
const cx = classNames.bind(styles);
export default function CommentInput({ postInfo, loadComments }) {
  const { id, slug, title } = postInfo;
  const [nickName, setNickName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const makeReview = useCallback(async () => {
    if (nickName === "") {
      setError("nickName");
      return;
    } else if (comment === "") {
      setError("comment");
      return;
    }
    const sanityService = new SanityService();
    const now = new Date();
    const result = await sanityService.setComment({
      id,
      slug,
      title,
      nickName: JSON.stringify(nickName),
      comment: JSON.stringify(comment),
      createdAt: new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      ).toISOString(),
    });
    console.log(result);
    setNickName("");
    setComment("");
  }, [nickName, comment]);
  return (
    <div className={cx("commentInput")}>
      <div className={cx("contentWrapper")}>
        <div className={cx("contentInnerWrapper")}>
          <div className={cx("lengthCount")}>{`${nickName.length} / 20`}</div>
          <input
            id={"nickNameInput"}
            className={cx("nickNameInput", { error: error === "nickName" })}
            onChange={(e) => {
              if (e.target.value.length > 20) return;
              setNickName(e.target.value);
            }}
            value={nickName}
            type="text"
            placeholder={"닉네임"}
          />
        </div>
        <div className={cx("contentInnerWrapper")}>
          <div className={cx("lengthCount")}>{`${comment.length} / 300`}</div>
          <textarea
            id={"commentInputTxt"}
            className={cx("commentInputTxt", { error: error === "comment" })}
            onChange={(e) => {
              if (e.target.value.length > 300) return;
              setComment(e.target.value);
            }}
            placeholder={"코멘트"}
            value={comment}
          ></textarea>
        </div>
      </div>
      <div className={cx("btnWrapper")}>
        <div className={cx("btnInnerWrapper")}>
          <button
            className={cx("commentSubmitBtn")}
            onClick={() => {
              makeReview();
            }}
          >
            {"등록"}
          </button>
          <button
            className={cx("commentSubmitBtn")}
            onClick={() => {
              setNickName("");
              setComment("");
              setError(null);
            }}
          >
            {"지우기"}
          </button>
        </div>
      </div>
    </div>
  );
}
