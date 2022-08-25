import styles from "../styles/Home.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import makeObserver from "../utils/Observer";
import SanityService from "../services/SanityService";
import Career from "../components/Career";
import PortPolio from "../components/Portpolio/PortPolio";
import Post from "../components/Post/Post";
import Footer from "../components/Footer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GitProfileService from "../services/GitProfileService";
import _ from "lodash";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import Menus from "../components/Menus";
export default function Home({
  posts,
  portpolios,
  career,
  home,
  windowWidth,
  contentWidth,
  typeState,
  menuState,
  viewState,
  subMenuState,
  subViewState,
  mainTitleState,
  subTitleState,
}) {
  const router = useRouter();
  const postRef = useRef(null);
  const portRef = useRef(null);
  const careerRef = useRef(null);
  const [type, setType] = typeState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [view, setView] = viewState;
  const [subView, setSubView] = subViewState;
  const [mainTitle, setMainTitle] = mainTitleState;
  const [subTitle, setSubTitle] = subTitleState;
  const ref = useMemo(() => {
    return {
      post: postRef,
      portpolio: portRef,
      career: careerRef,
    };
  }, [postRef, portRef, careerRef]);
  const portpoliMenu = [
    { id: "pub", name: "퍼블리싱" },
    { id: "js", name: "자바스크립트" },
    { id: "vue", name: "뷰" },
    { id: "react", name: "리엑트" },
  ];
  const makeMainTitle = useCallback((menu, subMenu) => {
    let title = null;
    if (menu === "post") {
      title = (
        <>
          <div className={cx("mainTitleText")}>{"새로운 글"}</div>
          <div className={cx("mainSubTitleText")}>{"전체글 보기 > "}</div>
        </>
      );
    } else if (menu === "portpolio") {
      title = (
        <>
          <div className={cx("mainTitleText")}>{"포트폴리오"}</div>
          <Menus
            menus={portpoliMenu}
            menu={subMenu}
            setMenu={setSubMenu}
          ></Menus>
        </>
      );
    } else if (menu === "career") {
      title = (
        <Col span={24} className={cx("mainTitleText")}>
          {"커리어"}
        </Col>
      );
    }
    return <div className={cx("mainTitle")}>{title}</div>;
  }, []);
  const makeSubTitle = useCallback((subMenu) => {
    let subTitle = null;
    let text = null;
    switch (subMenu) {
      case "pub":
        text = "퍼블리싱";
        break;
      case "js":
        text = "자바스크립트";
        break;
      case "vue":
        text = "뷰";
        break;
      case "react":
        text = "리엑트";
        break;
      default:
        text = "프론트엔드 언어 및 Framework";
    }
    subTitle = `${text}을(를) 활용해 제작한 웹 어플리케이션`;
    return (
      <div className={cx("subTitle")}>
        <div className={cx("subText")}>{subTitle}</div>
      </div>
    );
  });
  const goPosts = useCallback(
    (menu) => {
      setType(null);
      setMenu(null);
      setSubView(null);
      setSubTitle(null);
      router.push({ pathname: "/posts", query: { menu } });
    },
    [router]
  );
  //화면진입 //스크롤로 화면변경
  useEffect(() => {
    setType("home");
    router.query.menu ? setMenu(router.query.view) : setMenu("post");
    const option = {
      rootMargin: "-20% 0% -80% 0%",
    };
    const interSectionCallback = (entry) => {
      const menu = entry.target.dataset.idx;
      setView(menu);
    };
    const io = makeObserver(option, ref, interSectionCallback);
  }, []);
  // 메뉴 변경
  useEffect(() => {
    if (!menu) return;
    if (menu === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setView("post");
    } else {
      window.scrollTo({
        top: ref[menu].current.offsetTop,
        behavior: "smooth",
      });
      setView(menu);
    }
  }, [menu]);
  //하위메뉴 변경
  useEffect(() => {
    setSubView(subMenu);
    if (view === "portpolio") {
      setMainTitle(makeMainTitle(view, subMenu));
    }
  }, [subMenu]);
  // 화면 변경
  useEffect(() => {
    let subView = null;
    setMainTitle(makeMainTitle(view, subMenu));
    if (view === "post" || view == "career") {
      setSubMenu(null);
    }
  }, [view]);
  return (
    <>
      <div ref={postRef} data-idx="post" className={cx("componentWrapper")}>
        <Post
          posts={posts}
          windowWidth={windowWidth}
          contentWidth={contentWidth}
          subTitle={
            <>
              <div className={cx("subTitle")}>
                <div className={cx("subText")}>
                  {"최근 작성된 다섯개의 새로운 글"}
                </div>
              </div>
            </>
          }
        />
      </div>
      <div
        ref={portRef}
        data-idx="portpolio"
        className={cx("componentWrapper")}
      >
        <PortPolio
          portpolios={portpolios}
          windowWidth={windowWidth}
          contentWidth={contentWidth}
          subMenuState={subMenuState}
          makeSubTitle={makeSubTitle}
        />
      </div>
      <div ref={careerRef} data-idx="career" className={cx("componentWrapper")}>
        <Career
          career={career}
          windowWidth={windowWidth}
          contentWidth={contentWidth}
        />
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const gitProfileService = new GitProfileService();
  const home = await sanityService.getHome();
  let posts = await sanityService.getPosts();
  const portpolios = await sanityService.getPortpolio();
  const career = await sanityService.getCareer();
  const profile = await sanityService.getProfile();
  return {
    props: {
      home,
      posts,
      profile,
      portpolios,
      career,
    },
  };
}
