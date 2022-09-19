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
import { on, off, clear } from "../utils/Swing";
import { useEffect, useRef, useState } from "react";
const cx = classNames.bind(styles);
export default function About({ profile }) {
  const swing = useRef(null);
  const aboutRef = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let flag = true;
    if (!show) {
      on(swing, aboutRef);
    } else {
      off(swing, aboutRef);
    }
    return () => {
      clear(swing);
    };
  }, [show]);
  return (
    <div
      className={cx("aboutWrapper", { show: show })}
      onClick={() => {
        setShow(!show);
      }}
    >
      <div className={cx("about")} ref={aboutRef}>
        <Row className={cx("profileWrapper")}>
          <Col className={cx("profileTitle")} span={24}>
            {"🤡 WHO AM I ?"}
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
    </div>
  );
}
