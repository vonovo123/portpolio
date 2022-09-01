import styles from "../../styles/Post/PostElement.module.css";
import { Row, Col, Image } from "antd";
import classNames from "classnames/bind";
import { useCallback } from "react";
import { useRouter } from "next/router";
const cx = classNames.bind(styles);
export default function PostElement({ element }) {
  const router = useRouter();
  const goDetail = useCallback(
    (slug) => {
      router.push(`/post/${slug}`);
    },
    [router]
  );
  return (
    <div
      className={cx("elementWrapper")}
      onClick={() => {
        goDetail(element.slug);
      }}
    >
      <div className={cx("element")}>
        <Image
          src={element.thumbnail.imageUrl}
          alt={element.thumbnail.alt}
          className={cx("elementImage")}
          preview={false}
        />
        <div className={cx("contentWrapper")}>
          <div className={cx("postTitle")}>{element.title}</div>
          <div s className={cx("postShort")}>
            {element.shortContent}
          </div>
          <Row className={cx("tagWrapper")}>
            {element.tag.map((tag, idx) => (
              <Col className={cx("tag")} key={idx} span={5}>
                {tag.title}
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
