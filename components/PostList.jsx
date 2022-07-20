import styles from "../styles/Post.module.css";
import { Row, Col, Card, Descriptions, Image } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import dayjs from "dayjs";
const cx = classNames.bind(styles);
export default function PostList({
  posts,
  postsRef,
  changePost,
  listType,
  view,
  width,
}) {
  const router = useRouter();

  const [touchStart, setTouchStart] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);
  const [postList, setPostsList] = useState([
    posts[posts.length - 1],
    ...posts,
    posts[0],
  ]);
  const goDetail = (slug) => {
    router.push(`/post/${slug}`);
  };
  return (
    <Row align="middle">
      <Col span={24} className={cx("postWrapper")}>
        <ul
          ref={postsRef}
          className={cx("posts", { list: listType === "list" })}
          onTouchStart={(e) => {
            if (listType === "list") return;
            const { clientX, clientY } = e.touches[0];
            setTouchStart(e.timeStamp);
            setTouchPosition({ clientX, clientY });
          }}
          onTouchEnd={(e) => {
            if (listType === "list") return;
            const { clientX, clientY } = e.changedTouches[0];
            const { timeStamp } = e;

            const dx = clientX - touchPosition.clientX;
            const dy = clientY - touchPosition.clientY;
            const dt = timeStamp - touchStart;

            if (dx === 0) {
              return;
            }
            dx > 0 ? changePost(-1) : changePost(1);
          }}
        >
          {postList.map((post, idx) => {
            return (
              <li
                key={idx}
                className={cx("post", {
                  active: view === "post",
                  list: listType === "list",
                })}
              >
                <div className={cx("postInner")}>
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
                </div>
              </li>
            );
          })}
        </ul>
      </Col>
    </Row>
  );
}
