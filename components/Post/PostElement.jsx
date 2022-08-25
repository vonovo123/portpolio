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
    <Row
      className={cx("post", {})}
      onClick={() => {
        goDetail(element.slug);
      }}
    >
      <Col span={24} className={cx("postImageWrapper")}>
        <Image
          src={element.thumbnail.imageUrl}
          alt={element.thumbnail.alt}
          className={cx("postImage")}
          preview={false}
        />
      </Col>
      <Row className={cx("postWrapper")}>
        <Col span={24} className={cx("postTitle")}>
          {element.title}
        </Col>
        <Col span={24} className={cx("postShort")}>
          {element.shortContent}
        </Col>
        <Row className={cx("postTagWrapper")}>
          {element.tag.map((tag, idx) => (
            <Col className={cx("postTag")} key={idx}>
              {tag.title}
            </Col>
          ))}
        </Row>
      </Row>
    </Row>
  );
}
