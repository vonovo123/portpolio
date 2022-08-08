import { Card, Col, Row } from "antd";
import styles from "../styles/About.module.css";
import classNames from "classnames/bind";
import { Image } from "antd";
import {
  EnvironmentOutlined,
  GithubOutlined,
  MessageOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import BlogPostDetail from "./BlogPostDetail";
import { useState } from "react";
import Title from "./Title";
const cx = classNames.bind(styles);
export default function About({ view, profile, intro, width, aboutRef }) {
  const [showInfo, setShowInfo] = useState("com");
  const selShowInfo = (info) => {
    setShowInfo(info);
  };
  return (
    <div
      className={cx("about", { sel: view === "about" })}
      id="about"
      ref={aboutRef}
      data-idx="about"
    >
      <Title view={view} type={"about"} title={"어바웃"}></Title>
      <Row className={cx("profileWrapper")} span={24}>
        <Col
          className={cx("profileDesc", { sel: view === "about" })}
          xl={{ span: 10 }}
          lg={{ span: 10 }}
          md={{ span: 10 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Row span={24}>
            {(width >= 767 || showInfo !== "message") && (
              <Col
                className={cx("profileDescImageWrapper", {
                  sel: view === "about",
                })}
                span={24}
              >
                <Row span={24}>
                  {width >= 767 && (
                    <Image
                      src={profile.thumbnail.imageUrl}
                      alt={"profile_image"}
                      className={cx("profileDescImage", {
                        sel: view === "about",
                      })}
                      preview={false}
                    ></Image>
                  )}
                  {width < 767 && (
                    <>
                      <Col span={24} align="middle">
                        <Image
                          src={profile.thumbnail.imageUrl}
                          alt={"profile_image"}
                          className={cx("profileDescImage", {
                            sel: view === "about",
                          })}
                          preview={false}
                        ></Image>
                      </Col>
                      <Col span={24} align="middle">
                        <div className={cx("showInfo")}>
                          {showInfo === "com" &&
                            profile.company + " " + "권현우"}
                          {showInfo === "loc" && profile.location}
                          {showInfo === "git" && (
                            <a
                              href={profile.gitUrl}
                              target={"_blank"}
                              rel="noreferrer"
                              className={cx("aTag", { sel: view === "about" })}
                            >
                              {profile.gitUrl}
                            </a>
                          )}
                          {showInfo === "message" && profile.intro}
                        </div>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            )}

            {width < 767 && showInfo === "message" && (
              <Col className={cx("profileIntro", { sel: view === "about" })}>
                <BlogPostDetail blocks={intro.content} />
              </Col>
            )}
            <Col
              className={cx("profileDescInfo", { sel: view === "about" })}
              span={24}
            >
              {width >= 767 && (
                <Row>
                  <Col span={24} className={cx("profileDescInfoDetail")}>
                    <TeamOutlined />
                    <span className={cx("text")}>
                      {profile.company + " " + "권현우"}
                    </span>
                  </Col>
                  <Col span={24} className={cx("profileDescInfoDetail")}>
                    <EnvironmentOutlined />
                    <span className={cx("text")}>{profile.location}</span>
                  </Col>
                  <Col span={24} className={cx("profileDescInfoDetail")}>
                    <GithubOutlined />
                    <span className={cx("text")}>
                      <a
                        href={profile.gitUrl}
                        target={"_blank"}
                        rel="noreferrer"
                        className={cx("aTag", { sel: view === "about" })}
                      >
                        {profile.gitUrl}
                      </a>
                    </span>
                  </Col>
                  <Col span={24} className={cx("profileDescInfoDetail")}>
                    <MessageOutlined />{" "}
                    <span className={cx("text")}>{profile.intro}</span>
                  </Col>
                </Row>
              )}
              {width < 767 && (
                <Row>
                  <Col
                    span={6}
                    className={cx("profileDescInfoDetail", {
                      sel: showInfo === "com",
                    })}
                    align="middle"
                    onClick={() => {
                      selShowInfo("com");
                    }}
                  >
                    <TeamOutlined />
                  </Col>
                  <Col
                    span={6}
                    className={cx("profileDescInfoDetail", {
                      sel: showInfo === "loc",
                    })}
                    align="middle"
                    onClick={() => {
                      selShowInfo("loc");
                    }}
                  >
                    <EnvironmentOutlined />
                  </Col>
                  <Col
                    span={6}
                    className={cx("profileDescInfoDetail", {
                      sel: showInfo === "git",
                    })}
                    align="middle"
                    onClick={() => {
                      selShowInfo("git");
                    }}
                  >
                    <GithubOutlined />
                  </Col>
                  <Col
                    span={6}
                    className={cx("profileDescInfoDetail", {
                      sel: showInfo === "message",
                    })}
                    align="middle"
                    onClick={() => {
                      selShowInfo("message");
                    }}
                  >
                    <MessageOutlined />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Col>
        {width >= 767 && (
          <Col
            className={cx("profileIntro", { sel: view === "about" })}
            xl={{ span: 14 }}
            lg={{ span: 14 }}
            md={{ span: 14 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <BlogPostDetail blocks={intro.content} />
          </Col>
        )}
      </Row>
    </div>
  );
}
