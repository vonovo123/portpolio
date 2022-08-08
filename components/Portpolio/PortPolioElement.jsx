import styles from "../../styles/Portpolio/PortpolioElement.module.css";
import { Row, Col, Image } from "antd";
import classNames from "classnames/bind";
import { useCallback } from "react";
import { useRouter } from "next/router";
import {
  DeploymentUnitOutlined,
  EllipsisOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const cx = classNames.bind(styles);
export default function PortPolioElement({ element }) {
  const router = useRouter();
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

  return (
    <Row className={cx("element", {})} align={"center"}>
      <Col span={24} className={cx("mb30")}>
        <Image
          src={thumbnail.imageUrl}
          alt={thumbnail.alt}
          className={cx("elementImage")}
          preview={false}
        />
      </Col>
      <Row className={cx("wrapper")}>
        <Col span={24} className={cx("elementTitle", "mb30")}>
          {title}
        </Col>
        <Col span={24}>
          <Row>
            <Col
              className={cx("description")}
              span={8}
              align="center"
              onClick={() => {
                window.location.href = repoUrl;
              }}
            >
              <GithubOutlined className={styles.icon} />
              <div>깃 레포</div>
            </Col>
            <Col
              className={cx("description")}
              span={8}
              align="center"
              onClick={() => {
                window.location.href = demoUrl;
              }}
            >
              <DeploymentUnitOutlined className={styles.icon} />
              <div>데모 사이트</div>
            </Col>
            <Col
              className={cx("description")}
              span={8}
              align="center"
              onClick={() => {
                window.location.href = demoUrl;
              }}
            >
              <EllipsisOutlined className={styles.icon} />
              <div>상세 보기</div>
            </Col>

            {/* <Col span={12} className={cx("description")}>
              <Row align="center">
                <Col className={styles.skills}>
                  {skills.map((skill, idx) => (
                    <Image
                      key={idx}
                      className={styles.skill}
                      src={skill.iconUrl}
                      alt={skill.name}
                      preview={false}
                    />
                  ))}
                </Col>
                <Col span={24}>사용 기술</Col>
              </Row>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </Row>
  );
}
