import { Card, Col, Image, Row } from "antd";
import { GithubOutlined, DeploymentUnitOutlined } from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "../styles/Portpolio.module.css";
import classNames from "classnames/bind";
import PortPolioNav from "./PortPolioNav";
import BlogPostDetail from "./BlogPostDetail";
import { useState } from "react";
const cx = classNames.bind(styles);

export default function Portpolio({
  html,
  vanillaJs,
  vueNuxt,
  reactNext,
  view,
  width,
}) {
  const [target, setTarget] = useState([...html]);
  const change = function (idx) {
    if (idx === 0) {
      setTarget([...html]);
    } else if (idx === 1) {
      setTarget([...vanillaJs]);
    } else if (idx === 2) {
      setTarget([...vueNuxt]);
    } else if (idx === 3) {
      setTarget([...reactNext]);
    } else {
      setTarget([]);
    }
  };
  return (
    <div className={styles.portpolio} id="portpolio" data-idx="portpolio">
      <div className={styles.titleWrapper}>
        <div className={cx("titleCover", { sel: view === "portpolio" })}></div>
        <div className={cx("titleText", { sel: view === "portpolio" })}>
          Portpolio
        </div>
      </div>
      <PortPolioNav change={change} />
      <div className={styles.contentListWapper}>
        <Row
          align="middle"
          style={{ height: "auto" }}
          className={styles.contentList}
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
                <Col key={idx} span={24}>
                  <Row className={styles.contentWrapper}>
                    <Col
                      className={styles.contentHeadWrapper}
                      xl={{ span: 9 }}
                      lg={{ span: 9 }}
                      md={{ span: 24 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                    >
                      <Row span={24}>
                        <Col
                          className={styles.contentHeadImageWrapper}
                          span={24}
                        >
                          <Image
                            src={thumbnail.imageUrl}
                            alt={thumbnail.alt}
                            className={styles.contentHeadImage}
                            preview={false}
                          ></Image>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      className={styles.contentBody}
                      xl={{ span: 15 }}
                      lg={{ span: 15 }}
                      md={{ span: 24 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                    >
                      <Row>
                        <Col className={styles.contentBodyHead} span={24}>
                          <div className={styles.contentBodyHeaderTitle}>
                            {title}
                          </div>
                          <div className={styles.contentBodyHeaderInfo}>
                            {dayjs(createdAt).format("YYYY / MMMM DD")}
                          </div>
                        </Col>
                        <Col className={styles.contentBodyBody} span={24}>
                          <BlogPostDetail blocks={content} />
                        </Col>

                        <Col className={styles.contentHeadText} span={24}>
                          <Row span={24}>
                            <Col
                              className={styles.repoDescription}
                              span={7}
                              align="center"
                              onClick={() => {
                                window.location.href = repoUrl;
                              }}
                            >
                              <GithubOutlined className={styles.icon} />
                              <div>GIT REPO</div>
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
                              <div>DEMO URL</div>
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
                              <div>SKILL SET</div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              );
            }
          )}
        </Row>
      </div>
    </div>
  );
}
