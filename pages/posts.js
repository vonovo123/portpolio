import SanityService from "../services/SanityService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Posts.module.css";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import classNames from "classnames/bind";
import BreadCrumb from "../components/BreadCrumb";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";
import { Col, Row, Image } from "antd";
import fadeTransition from "../styles/transition/fade.module.css";
import dayjs from "dayjs";
const cx = classNames.bind(styles);
export default function Posts({ posts }) {
  const router = useRouter();
  const [view, setView] = useState("post");
  const [showMenu, setShowMenu] = useState(false);
  const [breadCrumParams, setBreadCrumParams] = useState([]);
  const [menu, setMenu] = useState(router.query.menu || "ALL");
  const [width, setWidth] = useState();
  const menus = ["ALL", "개발", "일상", "리뷰"];
  const nodeRef = useRef(null);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);
  const goBack = () => {
    router.back();
  };
  const navClickEvent = (target) => {
    if (target === "home") {
      router.push("/");
    } else {
      goBack();
    }
  };
  const backBtnMouseHoverEvent = (view) => {
    setView(view);
  };
  const goDetail = (slug) => {
    router.push(`/post/${slug}`);
  };
  const createCategory = () => (
    <div className={cx("menuWrapper")}>
      <div
        className={cx("selMenu", { disable: showMenu })}
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <div className={cx("selMenuText")}>{menu}</div>
        {!showMenu && <CaretDownOutlined className={cx("selMenuArrow")} />}
        {showMenu && <CaretUpOutlined className={cx("selMenuArrow")} />}
      </div>

      <div className={cx("categoryMenu")}>
        <CSSTransition
          in={showMenu}
          classNames={fadeTransition}
          timeout={500}
          mountOnEnter
          nodeRef={nodeRef}
        >
          <Row ref={nodeRef}>
            {menus.map((menu, idx) => (
              <Col
                key={idx}
                span={24}
                className={cx("menu")}
                onClick={() => {
                  setMenu(menus[idx]);
                  setShowMenu(false);
                }}
              >
                {menu}
              </Col>
            ))}
          </Row>
        </CSSTransition>
      </div>
    </div>
  );
  useEffect(() => {
    setBreadCrumParams(["POSTS"]);
  }, []);

  return (
    <div className={cx("posts")}>
      <Header
        view={view}
        width={width}
        type={"postList"}
        navClickEvent={navClickEvent}
        backBtnMouseHoverEvent={backBtnMouseHoverEvent}
      />

      <div className={cx("container", "mb30")}>
        <BreadCrumb params={breadCrumParams}></BreadCrumb>
        {createCategory()}
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
        <Footer />
      </div>
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
