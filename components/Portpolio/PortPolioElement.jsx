import styles from "../../styles/Portpolio/PortpolioElement.module.css";
import { Row, Col, Image } from "antd";
import classNames from "classnames/bind";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  DeploymentUnitOutlined,
  EllipsisOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const cx = classNames.bind(styles);
export default function PortPolioElement({ element }) {
  const router = useRouter();
  const elRef = useRef(null);
  const [index, setIndex] = useState(1);
  const {
    author,
    content,
    createdAt,
    demoUrl,
    repoUrl,
    skills,
    thumbnail,
    title,
  } = element;
  const moveElement = useCallback(() => {
    elRef.current.style.transition = `${0.5}s ease-out`;
    elRef.current.style.transform = `translate3d(0, ${-530 * index}px, 0)`;
    setIndex(index + 1);
    if (index === 2) {
      setTimeout(() => {
        elRef.current.style.transition = `${0}s ease-out`;
        elRef.current.style.transform = `translate3d(0, 0px, 0)`;
        setIndex(1);
      }, 500);
    }
  }, [index]);
  return (
    <div>
      <div className={cx("elementWrapper")}>
        <div className={cx("elementInnerWrapper")} ref={elRef}>
          <Row className={cx("element")}>
            <div className={cx("skills")} align={"left"}>
              {skills.map((skill, idx) => (
                <Image
                  key={idx}
                  className={styles.skill}
                  src={skill.iconUrl}
                  alt={skill.name}
                  preview={false}
                />
              ))}
            </div>
            <Col span={24} className={cx()}>
              <Image
                src={thumbnail.imageUrl}
                alt={thumbnail.alt}
                className={cx("elementImage")}
                preview={false}
              />
            </Col>
            <Col span={24} className={cx("elementTitle")}>
              {title}
            </Col>
          </Row>
          <Row className={cx("element")}>
            <Col span={24} className={cx("elementContent")}>
              {<div>test</div>}
              {<div>test</div>}
              {<div>test</div>}
              {<div>test</div>}
              {<div>test</div>}
              {<div>test</div>}
              {<div>test</div>}
              {<div>test</div>}
              {<div>test</div>}
            </Col>
          </Row>
          <Row className={cx("element")}>
            <div className={cx("skills")} align={"left"}>
              {skills.map((skill, idx) => (
                <Image
                  key={idx}
                  className={styles.skill}
                  src={skill.iconUrl}
                  alt={skill.name}
                  preview={false}
                />
              ))}
            </div>
            <Col span={24} className={cx()}>
              <Image
                src={thumbnail.imageUrl}
                alt={thumbnail.alt}
                className={cx("elementImage")}
                preview={false}
              />
            </Col>
            <Col span={24} className={cx("elementTitle")}>
              {title}
            </Col>
          </Row>
        </div>
      </div>
      <Row>
        <Col span={24} className={cx("description")}>
          <Row>
            <Col
              span={8}
              align="center"
              onClick={() => {
                window.location.href = repoUrl;
              }}
            >
              <GithubOutlined className={styles.icon} />
              <div>레포지토리</div>
            </Col>
            <Col
              span={8}
              align="center"
              onClick={() => {
                window.location.href = demoUrl;
              }}
            >
              <DeploymentUnitOutlined className={styles.icon} />
              <div>데모페이지</div>
            </Col>
            <Col span={8} align="center" onClick={moveElement}>
              <EllipsisOutlined className={styles.icon} />
              <div>상세 보기</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
