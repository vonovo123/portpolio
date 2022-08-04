import SanityService from "../services/SanityService";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import styles from "../styles/Posts.module.css";
import Menus from "../components/Menus";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import BreadCrumb from "../components/BreadCrumb";
import { Col, Row, Image } from "antd";
import dayjs from "dayjs";

const cx = classNames.bind(styles);
export default function Posts({ posts }) {
  const router = useRouter();
  const [view, setView] = useState("post");
  const [breadCrumParams, setBreadCrumParams] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState(router.query.menu || "ALL");
  const [width, setWidth] = useState();
  const menus = ["ALL", "개발", "일상", "리뷰"];

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);
  const navClickEvent = () => {
    router.push("/");
  };
  const goDetail = (slug) => {
    router.push(`/post/${slug}`);
  };
  useEffect(() => {
    setBreadCrumParams(["POSTS"]);
  }, []);

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        if (showMenu) {
          setShowMenu(!showMenu);
        }
      }}
    >
      <Header
        view={view}
        width={width}
        type={"postList"}
        navClickEvent={navClickEvent}
      />
      <div className={cx("container")}>
        <div className={cx("mb20")}>
          <BreadCrumb params={breadCrumParams}></BreadCrumb>
        </div>
        <Menus
          menus={menus}
          setMenu={setMenu}
          menu={menu}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        ></Menus>
        <ul className={cx("postWrapper")}>
          {posts.map((post, idx) => {
            return (
              <li key={idx} className={cx("post")}>
                <div className={cx("postInner", "inner")}>
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
                      <Row>
                        <Col span={24} className={cx("postContentText")}>
                          {width >= 767 && (
                            <div className={cx("postInfoWrapper")}>
                              <span className={cx("postDate")}>
                                {dayjs(post.createdAt).format(
                                  "MMMM DD / YYYY "
                                )}
                              </span>
                            </div>
                          )}
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
                                    span={4}
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
                    </Col>
                  </Row>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const posts = await sanityService.getPosts();
  return {
    props: {
      posts,
    },
  };
}
