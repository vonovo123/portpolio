import styles from "../../styles/Portpolio/PortpolioElement.module.css";
import { Row, Col, Image } from "antd";
import classNames from "classnames/bind";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GithubOutlined, PaperClipOutlined } from "@ant-design/icons";
import BlogMarkDown from "../BlogMarkDown";

const cx = classNames.bind(styles);
export default function PortPolioElement({ element, sel }) {
  const router = useRouter();
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
  return (
    <div className={cx("elementWrapper")}>
      <div className={cx("element")}>
        <Image
          src={thumbnail.imageUrl}
          alt={thumbnail.alt}
          className={cx("elementImage")}
          preview={false}
        />
        <div className={cx("contentWrapper", { sel: sel })}>
          <div className={cx("contentTitleWrapper")}>
            <div className={cx("title")}>{title}</div>
            <div className={cx("shortContent")}>{shortContent}</div>
          </div>
          <BlogMarkDown markdown={portpolioContent.markdown} />
        </div>

        <div className={cx("btnWrapper")}>
          <Row className={cx("tagWrapper")}>
            {skills.map((tag, idx) => (
              <Col className={cx("tag")} key={idx} span={5}>
                {tag.name}
              </Col>
            ))}
          </Row>
          <div
            className={cx("btn")}
            onClick={() => {
              window.location.href = repoUrl;
            }}
          >
            <GithubOutlined className={styles.icon} />
            <div>레포지토리</div>
          </div>
          <div
            align="center"
            className={cx("btn")}
            onClick={() => {
              window.location.href = demoUrl;
            }}
          >
            <PaperClipOutlined className={styles.icon} />
            <div>데모페이지</div>
          </div>
        </div>
      </div>
    </div>
  );
}
