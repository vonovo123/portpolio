import styles from "../../styles/ReComment.module.css";
import classNames from "classnames/bind";
import dayjs from "dayjs";
const cx = classNames.bind(styles);
import { Image } from "antd";
export default function ReComment({ comment, idx }) {
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
            src={`https://placedog.net/100/100/?id=${idx + 10}`}
            alt={"randomDog"}
            preview={false}
          />
        </div>
        <div className={cx("cotentWrapper")}>
          <div className={cx("commentName")}>
            {JSON.parse(comment.nickName)}
          </div>
          <div className={cx("commentInnerWrapper")}>
            <div className={cx("commentTxt")}>
              {JSON.parse(comment.comment)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
