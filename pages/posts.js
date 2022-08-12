import SanityService from "../services/SanityService";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import styles from "../styles/Posts.module.css";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import BreadCrumb from "../components/BreadCrumb";
import { Col, Row, Image } from "antd";
import dayjs from "dayjs";
import Title from "../components/Title";

const cx = classNames.bind(styles);
export default function Posts({ posts, profile }) {
  const router = useRouter();
  profile = profile[0];
  const [width, setWidth] = useState();
  const devRef = useRef(null);
  const lifeRef = useRef(null);
  const reviewRef = useRef(null);
  const ref = useMemo(() => {
    return {
      dev: devRef,
      life: lifeRef,
      review: reviewRef,
    };
  }, [devRef, lifeRef, reviewRef]);

  const headerMenus = [
    { id: "dev", name: "개발" },
    { id: "life", name: "일상" },
    { id: "review", name: "리뷰" },
  ];
  const titleMenus = {
    dev: "개발",
    life: "일상",
    review: "리뷰",
  };
  const [view, setView] = useState(router.query.menu || "dev");
  const [breadCrumParams, setBreadCrumParams] = useState([]);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);
  const navClickEvent = useCallback(
    (target) => {
      if (target === "home" || target === "post") {
        router.push("/");
      } else {
        setView(target);
        window.scrollTo({
          top: ref[target].current.offsetTop,
          behavior: "smooth",
        });
      }
    },
    [ref, router]
  );
  const goDetail = useCallback(
    (slug) => {
      router.push(`/post/${slug}`);
    },
    [router]
  );
  useEffect(() => {
    setBreadCrumParams(["POSTS"]);
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={cx("wrapper")}></div>
        <Header
          view={view}
          width={width}
          type={"postList"}
          navClickEvent={navClickEvent}
          menus={headerMenus}
          profile={profile}
        />
        <div className={cx("container", "title")}>
          <Title view={view} type={view} show={true} menus={titleMenus}></Title>
        </div>
        <div className={cx("container")} ref={devRef}></div>
        <div className={cx("container")} ref={lifeRef}></div>
        <div className={cx("container")} ref={reviewRef}>
          {" "}
        </div>
        {/* <div className={cx("mb20")}>
            <BreadCrumb params={breadCrumParams}></BreadCrumb>
          </div> */}
        {/* <ul className={cx("postWrapper")}>
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
          </ul> */}
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const posts = await sanityService.getPosts();
  const profile = await sanityService.getProfile();
  return {
    props: {
      posts,
      profile,
    },
  };
}
