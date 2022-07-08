import { Row, Col, Card, Descriptions, Image } from "antd";
import dayjs from "dayjs";
import styles from "../styles/Post.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import { useRouter } from "next/router";
const cx = classNames.bind(styles);
export default function PostList({ posts, view, width }) {
  const router = useRouter();
  const goDetail = (slug) => {
    router.push(`/post/${slug}`);
  };
  return (
    <div className={cx("postList")} id="post" data-idx="post">
      <div className={styles.titleWrapper}>
        <div className={cx("titleCover", { sel: view === "post" })}></div>
        <div className={cx("titleText", { sel: view === "post" })}>Post</div>
      </div>
      <Row span={24} align="top" style={{ height: "auto" }}>
        {posts.map((post, idx) => {
          return (
            <Col
              span={24}
              className={cx("postWrapper")}
              key={post.slug}
              onClick={() => {
                goDetail(post.slug);
              }}
            >
              {/* <Link href={`/post/${post.slug}`}> */}
              <Row className={cx("post")} span={24}>
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
                  <Row>
                    {width >= 767 && (
                      <>
                        <Col span={21} className={cx("postContentText")}>
                          <div className={cx("postTitleWrapper")}>
                            <div className={cx("postTitle")}>{post.title}</div>
                          </div>
                          <div className={cx("postInfoWrapper")}>
                            <span className={cx("postDate")}>
                              {dayjs(post.createdAt).format("MMMM DD / YYYY ")}
                            </span>
                          </div>
                          <div className={cx("postShort")}>
                            {post.shortContent}
                          </div>
                        </Col>
                        <Col className={cx("postCategory")} span={3}>
                          개발
                        </Col>
                        <Col className={cx("postTagWrapper")} span={24}></Col>
                      </>
                    )}
                    {width < 767 && (
                      <>
                        <Col
                          className={cx("postCategory")}
                          offset={18}
                          span={6}
                        >
                          개발
                        </Col>
                        <Col span={24} className={cx("postContentText")}>
                          <div className={cx("postTitleWrapper")}>
                            <div className={cx("postTitle")}>{post.title}</div>
                          </div>
                          <div className={cx("postInfoWrapper")}>
                            <span className={cx("postDate")}>
                              {dayjs(post.createdAt).format("MMMM DD / YYYY ")}
                            </span>
                          </div>
                          <div className={cx("postShort")}>
                            {post.shortContent}
                          </div>
                        </Col>

                        <Col className={cx("postTagWrapper")} span={24}></Col>
                      </>
                    )}
                  </Row>
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
