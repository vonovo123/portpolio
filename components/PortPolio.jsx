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
    <div className={styles.portpolio} id="portpolio">
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
                <Col key={idx} span={24} className={styles.contentWrapper}>
                  <div className={styles.contentHeadWrapper}>
                    <div className={styles.contentHeadImageWrapper}>
                      <Image
                        src={thumbnail.imageUrl}
                        alt={thumbnail.alt}
                        className={styles.contentHeadImage}
                        preview={false}
                      ></Image>
                    </div>
                    <div className={styles.contentHeadText}>
                      <div>
                        <div className={styles.repoDescription}>
                          <GithubOutlined />
                          <a
                            href={repoUrl}
                            target={"_blank"}
                            rel="noreferrer"
                            className={styles.url}
                          >
                            {repoUrl.substr(8)}
                          </a>
                        </div>
                      </div>
                      <div>
                        <div className={styles.repoDescription}>
                          <DeploymentUnitOutlined />
                          <a
                            href={demoUrl}
                            target={"_blank"}
                            rel="noreferrer"
                            className={styles.url}
                          >
                            {demoUrl.substr(8)}
                          </a>
                        </div>
                      </div>
                      <div className={styles.skills}>
                        {skills.map((skill, idx) => (
                          <div key={idx}>
                            <Image
                              className={styles.skillImage}
                              src={skill.iconUrl}
                              alt={skill.name}
                              preview={false}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={styles.contentBody}>
                    <div className={styles.contentBodyHead}>
                      <h1>{title}</h1>
                      {author.name}
                      &nbsp;
                      {dayjs(createdAt).format("YYYY / MMMM DD")}
                    </div>
                    <div className={styles.contentBodyBody}>
                      <BlogPostDetail blocks={content} />
                    </div>
                  </div>
                </Col>
              );
            }
          )}
        </Row>
      </div>
    </div>
  );
}
