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
const cx = classNames.bind(styles);
export default function About({ view, profile }) {
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
                src={profile.avatar_url}
                alt={"profile_image"}
                className={cx("profileDescImage")}
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
                  <a href={profile.html_url} target={"_blank"} rel="noreferrer">
                    {profile.html_url}
                  </a>
                </span>
              </div>
              <div>
                <MessageOutlined /> <span>{profile.bio}</span>
              </div>
            </div>
          </div>
          <div className={cx("profileIntro")}>
            {/* <div className={cx("title")}>WHO AM I ?</div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
