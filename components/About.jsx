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
const cx = classNames.bind(styles);
export default function About({ view, profile, intro }) {
  return (
    <div className={styles.about} id="about">
      <div className={styles.titleWrapper}>
        <div className={cx("titleCover", { sel: view === "about" })}></div>
        <div className={cx("titleText", { sel: view === "about" })}>About</div>
      </div>
      <div className={cx("profileWrapper")}>
        <div className={cx("profile")}>
          <div className={cx("profileDesc")}>
            <div className={cx("profileDescImageWrapper")}>
              <Image
                src={profile.thumbnail.imageUrl}
                alt={"profile_image"}
                className={cx("profileDescImage")}
                preview={false}
              ></Image>
            </div>
            <div className={cx("profileDescInfo")}>
              <div className={cx("name")}>{profile.name}</div>
              <div>
                <TeamOutlined />
                <span>{profile.company}</span>
              </div>
              <div>
                <EnvironmentOutlined />
                <span>{profile.location}</span>
              </div>
              <div>
                <GithubOutlined />
                <span>
                  <a href={profile.gitUrl} target={"_blank"} rel="noreferrer">
                    {profile.gitUrl}
                  </a>
                </span>
              </div>
              <div>
                <MessageOutlined /> <span>{profile.intro}</span>
              </div>
            </div>
          </div>
          <div className={cx("profileIntro")}>
            <BlogPostDetail blocks={intro.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
