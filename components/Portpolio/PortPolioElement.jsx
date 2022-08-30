import styles from "../../styles/Portpolio/PortpolioElement.module.css";
import { Row, Col, Image } from "antd";
import classNames from "classnames/bind";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GithubOutlined, PaperClipOutlined } from "@ant-design/icons";
import BlogMarkDown from "../BlogMarkDown";

const cx = classNames.bind(styles);
export default function PortPolioElement({ element }) {
  const router = useRouter();
  const [detail, setDetail] = useState(false);
  const {
    author,
    shortContent,
    portpolioContent,
    demoUrl,
    repoUrl,
    skills,
    thumbnail,
    title,
  } = element;
  const moveElement = useCallback(() => {
    setDetail(!detail);
  }, [detail]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("elementWrapper", { detail: detail })}>
        <Row className={cx("element")}>
          <Col span={24} className={cx("imageWrapper", "mb20")}>
            <Image
              src={thumbnail.imageUrl}
              alt={thumbnail.alt}
              className={cx("elementImage")}
              preview={false}
            />
          </Col>
          <Col span={24} className={cx("elementTitle", "pb20")}>
            {title}
          </Col>
          <Col span={24} className={cx("elementShortContent", "pb20")}>
            {shortContent}
          </Col>
          {/* <Col span={24} className={cx("mb20")}>
            <Row className={cx("tagWrapper")} align={"center"}>
              {skills.map((tag, idx) => (
                <Col className={cx("tag")} key={idx} span={6}>
                  {tag.name}
                </Col>
              ))}
            </Row>
          </Col> */}

          <Col
            span={12}
            align="center"
            onClick={() => {
              window.location.href = repoUrl;
            }}
          >
            <GithubOutlined className={styles.icon} />
            <div>레포지토리</div>
          </Col>
          <Col
            span={12}
            align="center"
            onClick={() => {
              window.location.href = demoUrl;
            }}
          >
            <PaperClipOutlined className={styles.icon} />
            <div>데모페이지</div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
