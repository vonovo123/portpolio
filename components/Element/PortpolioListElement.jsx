import styles from "../../styles/Element/PortpolioListElement.module.css";
import { Row, Col, Image } from "antd";
import classNames from "classnames/bind";
import { GithubOutlined, PaperClipOutlined } from "@ant-design/icons";
import BlogMarkDown from "../BlogMarkDown";

const cx = classNames.bind(styles);
export default function PortpolioListElement({ element }) {
  const {
    author,
    portpolioContent,
    demoUrl,
    repoUrl,
    skills,
    thumbnail,
    title,
  } = element;
  return (
    <div className={cx("element")}>
      <div className={cx("elementInnerWrapper")}>
        <div className={cx("elementImageWrapper")}>
          <Image
            src={thumbnail.imageUrl}
            alt={thumbnail.alt}
            className={cx("elementImage")}
            preview={false}
          />
        </div>
        <div className={cx("elementContentWrapper")}>
          <div className={cx("title")}>{title}</div>

          <div className={cx("content")}>
            <BlogMarkDown markdown={portpolioContent.markdown} />
          </div>
          <div className={cx("btnWrapper")}>
            <div
              className={cx("btn")}
              onClick={() => {
                window.location.href = repoUrl;
              }}
            >
              <GithubOutlined className={styles.icon} />
              <div>GIT Repo</div>
            </div>
            <div
              className={cx("btn")}
              onClick={() => {
                window.location.href = demoUrl;
              }}
            >
              <PaperClipOutlined className={styles.icon} />
              <div>Demo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
