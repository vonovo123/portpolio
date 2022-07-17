import SanityService from "../services/SanityService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/PostList.module.css";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import Post from "../components/Post";
import { Row, Col } from "antd";
import classNames from "classnames/bind";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "../styles/transition/fade.module.css";
const cx = classNames.bind(styles);
export default function PostList({ posts }) {
  const router = useRouter();
  const [view, setView] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState("ALL");
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
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      goBack();
    }
  };
  const backBtnMouseHoverEvent = (view) => {
    setView(view);
  };
  const goHome = useCallback(
    () => {
      router.push("/");
    },
    { router }
  );
  return (
    <div className={styles.wrapper}>
      <Header
        view={view}
        width={width}
        type={"postList"}
        title="포스팅 목록"
        navClickEvent={navClickEvent}
        backBtnMouseHoverEvent={backBtnMouseHoverEvent}
      />
      <div className={cx("container", "mb30")}>
        <div className={cx("categoryWrapper", "mb10")} span={24}>
          <div className={cx("category", "home")} onClick={goHome}>
            {"HOME"}
          </div>
          <div className={cx("category")}>{">"}</div>
          <div className={cx("category")}>{"POSTS"}</div>
          <div className={cx("category")}>{">"}</div>
          <div className={cx("category", "list", { sel: !showMenu })}>
            <div
              className={cx("selMenu")}
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <div>{menu}</div>
              {!showMenu && (
                <CaretDownOutlined style={{ marginLeft: 10, paddingTop: 3 }} />
              )}
              {showMenu && (
                <CaretUpOutlined style={{ marginLeft: 10, paddingTop: 3 }} />
              )}
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
                        console.log(menu);
                      }}
                    >
                      {menu}
                    </Col>
                  ))}
                </Row>
              </CSSTransition>
            </div>
          </div>
        </div>
        <Post posts={posts} view={view} width={width} showTitle={false} />
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
