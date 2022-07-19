import { Row, Col, Card, Descriptions, Image } from "antd";
import dayjs from "dayjs";
import styles from "../styles/Post.module.css";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import {
  LeftSquareOutlined,
  RightOutlined,
  RightSquareOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Title from "./Title";
const cx = classNames.bind(styles);
export default function PostPreview({ posts, view, width, show }) {
  const router = useRouter();
  const [postIndex, setPostIndex] = useState(0);
  const goDetail = (slug) => {
    router.push(`/post/${slug}`);
  };
  const ref = useRef(null);
  const goList = () => {
    router.push(`/postList`);
  };
  return (
    <div
      className={cx("postList", { sel: view === "post" })}
      id="post"
      data-idx="post"
    >
      <Title view={view} type={"post"} show={show}></Title>
      <Row className={cx("info", { hide: !show })}>
        <Col
          className={cx("infoText", { sel: view === "post" })}
          xl={{ span: 3 }}
          lg={{ span: 3 }}
          md={{ span: 3 }}
          sm={{ span: 11 }}
          xs={{ span: 11 }}
        >
          최근 5개의 게시물
        </Col>
        <Col
          className={cx("moveText", { sel: view === "post" })}
          xl={{ span: 3 }}
          lg={{ span: 3 }}
          md={{ span: 3 }}
          sm={{ span: 12 }}
          xs={{ span: 12 }}
          onClick={goList}
        >
          {"전체보기"} <RightOutlined />
        </Col>
      </Row>
      <Row align="middle">
        <Col span={1} style={{ textAlign: "center", fontSize: 25, zIndex: 3 }}>
          {postIndex > 0 && (
            <LeftSquareOutlined
              onClick={() => {
                setPostIndex(postIndex - 1);
                const { width } = ref.current.getBoundingClientRect();
                ref.current.style.transform = `translate3d(${
                  -width * (postIndex - 1)
                }px, 0, 0)`;
              }}
            />
          )}
        </Col>
        <Col span={22} className={cx("postWrapper")}>
          <ul ref={ref} className={cx("posts")}>
            {posts.map((post, idx) => {
              return (
                <li
                  key={idx}
                  className={cx(
                    "post",
                    { active: view === "post" },
                    { show: postIndex === idx }
                  )}
                >
                  <Row
                    onClick={() => {
                      goDetail(post.slug);
                    }}
                  >
                    <Col
                      className={cx("postImageWrapper")}
                      xl={{ span: 10 }}
                      lg={{ span: 10 }}
                      md={{ span: 24 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                    >
                      <Image
                        src={post.thumbnail.imageUrl}
                        alt={post.thumbnail.alt}
                        className={cx("postImage")}
                        preview={false}
                      />
                    </Col>
                    <Col
                      xl={{ span: 14 }}
                      lg={{ span: 14 }}
                      md={{ span: 24 }}
                      sm={{ span: 24 }}
                      xs={{ span: 24 }}
                      className={cx("postContent")}
                    >
                      {width >= 767 && (
                        <Row>
                          <Col span={24} className={cx("postContentText")}>
                            <div className={cx("postInfoWrapper")}>
                              <span className={cx("postDate")}>
                                {dayjs(post.createdAt).format(
                                  "MMMM DD / YYYY "
                                )}
                              </span>
                            </div>
                            <div className={cx("postTitleWrapper")}>
                              <div className={cx("postTitle")}>
                                {post.title}
                              </div>
                            </div>

                            <div className={cx("postShort")}>
                              {post.shortContent}
                            </div>
                          </Col>
                          <Col className={cx("postTagWrapper")} span={24}>
                            <Row>
                              <Col span={24}>
                                <Row>
                                  {post.tag.map((tag, idx) => (
                                    <Col
                                      className={cx("postCategory")}
                                      span={5}
                                      offset={1}
                                      key={idx}
                                    >
                                      {tag.title}
                                    </Col>
                                  ))}
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      )}
                      {width < 767 && (
                        <Row>
                          <Col span={24} className={cx("postContentText")}>
                            <div className={cx("postTitleWrapper")}>
                              <div className={cx("postTitle")}>
                                {post.title}
                              </div>
                            </div>

                            <div className={cx("postShort")}>
                              {post.shortContent}
                            </div>
                          </Col>

                          <Col className={cx("postTagWrapper")} span={24}>
                            <Row>
                              <Col span={24}>
                                <Row>
                                  {post.tag.map((tag, idx) => (
                                    <Col
                                      className={cx("postCategory")}
                                      span={7}
                                      offset={1}
                                      key={idx}
                                    >
                                      {tag.title}
                                    </Col>
                                  ))}
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col span={1} style={{ textAlign: "center", fontSize: 25, zIndex: 3 }}>
          {postIndex < 4 && (
            <RightSquareOutlined
              onClick={() => {
                setPostIndex(postIndex + 1);
                const { width } = ref.current.getBoundingClientRect();
                ref.current.style.transform = `translate3d(${
                  -width * (postIndex + 1)
                }px, 0, 0)`;
              }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
