import { Row, Col, Card, Descriptions, Image } from "antd";
import dayjs from "dayjs";
import styles from "../styles/Post.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
const cx = classNames.bind(styles);
export default function PostPreview({ posts, view, width, showTitle }) {
  const router = useRouter();
  const goDetail = (slug) => {
    router.push(`/post/${slug}`);
  };
  const goList = () => {
    router.push(`/postList`);
  };
  return (
    <div className={cx("postList")} id="post" data-idx="post">
      <Row className={cx("titleWrapper", { hide: !showTitle })}>
        <Col className={cx("titleText", { sel: view === "post" })} span={24}>
          POST
        </Col>
        <Col className={cx("infoText", { sel: view === "post" })} span={3}>
          최근 5개의 게시물
        </Col>
        <Col
          className={cx("moveText", { sel: view === "post" })}
          span={3}
          onClick={goList}
        >
          {"전체보기"} <RightOutlined />
        </Col>
      </Row>
      <Row span={24} align="top" style={{ height: "auto" }}>
        {posts.map((post, idx) => {
          return (
            <Col
              span={24}
              className={cx("postWrapper")}
              key={idx}
              onClick={() => {
                goDetail(post.slug);
              }}
            >
              <Row
                className={cx("post", { active: view === "post" })}
                span={24}
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
                            {dayjs(post.createdAt).format("MMMM DD / YYYY ")}
                          </span>
                        </div>
                        <div className={cx("postTitleWrapper")}>
                          <div className={cx("postTitle")}>{post.title}</div>
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
                          <div className={cx("postTitle")}>{post.title}</div>
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
                </Col>
              </Row>
              {/* </Link> */}
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
