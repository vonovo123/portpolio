import { Col, Row } from "antd";
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
export default function About({ profile }) {
  return (
    profile && (
      <div className={cx("about")}>
        <Row className={cx("profileWrapper")}>
          <Col className={cx("profileTitle")} span={24}>
            {" ABOUT ME "}
          </Col>
          <Col className={cx("profileDescImageWrapper")} span={24}>
            <Image
              src={profile.thumbnail.imageUrl}
              alt={"profile_image"}
              className={cx("profileDescImage")}
              preview={false}
            ></Image>
          </Col>
          <Col className={cx("profileDescInfo")} span={24}>
            <Row>
              <Col span={24} className={cx("profileDescInfoDetail")}>
                <TeamOutlined />
                <span className={cx("text")}>{profile.company}</span>
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
                    className={cx("aTag")}
                  >
                    {profile.gitUrl}
                  </a>
                </span>
              </Col>
              <Col span={24} className={cx("profileDescInfoDetail")}>
                <MessageOutlined />
                <span className={cx("text")}>{profile.intro}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  );
}
