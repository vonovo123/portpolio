import { Card, Col, Image, Row } from "antd";
import {
  GithubOutlined,
  DeploymentUnitOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";
import { CaretRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "../styles/Portpolio.module.css";
import classNames from "classnames/bind";
import PortPolioNav from "./PortPolioNav";
import BlogPostDetail from "./BlogPostDetail";
import { useState } from "react";
import Title from "./Title";
const cx = classNames.bind(styles);

export default function Portpolio({
  html,
  vanillaJs,
  vueNuxt,
  reactNext,
  view,
  width,
  show,
  portRef,
}) {
  const [target, setTarget] = useState([...html]);
  const change = (next) => {
    const nextIdx = postIndex + next;
    postsRef.current.style.transition = `${0.5}s ease-out`;
    postsRef.current.style.transform = `translate3d(${
      -postElWidth * nextIdx
    }px, 0, 0)`;

    setPostIndex(nextIdx);
    if (nextIdx === 10 || nextIdx === 0) {
      setTimeout(() => {
        nextIdx = 5;
        postsRef.current.style.transition = `${0}s ease-out`;
        postsRef.current.style.transform = `translate3d(${
          -postElWidth * nextIdx
        }px, 0, 0)`;
        setPostIndex(nextIdx);
      }, 500);
    }
  };
  return (
    <div
      className={cx("portpolio", { sel: view === "portpolio" })}
      ref={portRef}
      data-idx="portpolio"
    >
      <Row className={cx("info", { hide: !show })}>
        <Col className={cx("titleWrapper")}>
          <Title
            view={view}
            type={"portpolio"}
            title={"포트폴리오"}
            show={show}
          ></Title>
        </Col>
      </Row>

      {/* <PortPolioNav view={view} change={change} /> */}
      <Row align="middle">
        <Col
          xl={{ span: 1 }}
          lg={{ span: 1 }}
          md={{ span: 0 }}
          sm={{ span: 0 }}
          xs={{ span: 0 }}
        ></Col>
        <Col
          xl={{ span: 22 }}
          lg={{ span: 22 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          {target.map(
            (
              {
                author,
                content,
                createdAt,
                demoUrl,
                repoUrl,
                skills,
                thumbnail,
                title,
              },
              idx
            ) => {
              return (
                <Col
                  key={idx}
                  span={12}
                  className={cx("contentWrapper", {
                    sel: view === "portpolio",
                  })}
                  align="center"
                >
                  <Row>
                    <Col className={styles.head} span={24}>
                      <div className={styles.headDate}>
                        {dayjs(createdAt).format("YYYY / MMMM DD")}
                      </div>
                      <div className={styles.headTitle}>{title}</div>
                    </Col>
                    <Col span={24} className={styles.contentHeadImageWrapper}>
                      <Image
                        src={thumbnail.imageUrl}
                        alt={thumbnail.alt}
                        className={styles.contentHeadImage}
                        preview={false}
                      ></Image>
                    </Col>
                    <Col className={styles.contentHeadText} span={24}>
                      <Row>
                        <Col
                          className={styles.repoDescription}
                          span={7}
                          align="center"
                          onClick={() => {
                            window.location.href = repoUrl;
                          }}
                        >
                          <GithubOutlined className={styles.icon} />
                          <div>깃 레포</div>
                        </Col>
                        <Col
                          className={styles.repoDescription}
                          span={7}
                          align="center"
                          onClick={() => {
                            window.location.href = demoUrl;
                          }}
                        >
                          <DeploymentUnitOutlined className={styles.icon} />
                          <div>데모 사이트</div>
                        </Col>

                        <Col
                          className={styles.repoDescription}
                          span={10}
                          align={"center"}
                        >
                          <Row className={styles.skills} align={"center"}>
                            {skills.map((skill, idx) => (
                              <Col key={idx}>
                                <Image
                                  className={styles.skillImage}
                                  src={skill.iconUrl}
                                  alt={skill.name}
                                  preview={false}
                                />
                              </Col>
                            ))}
                          </Row>
                          <div>사용 기술</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* <Col span={14}>
                           <BlogPostDetail blocks={content} />
                          <Row>
                            <Col span={24}>
                              <div>{JSON.stringify(content)}</div>
                            </Col>
                          </Row>
                        </Col> */}
                </Col>
              );
            }
          )}
        </Col>
        <Col
          xl={{ span: 1 }}
          lg={{ span: 1 }}
          md={{ span: 0 }}
          sm={{ span: 0 }}
          xs={{ span: 0 }}
          align={"right"}
        ></Col>
      </Row>
    </div>
  );
}
