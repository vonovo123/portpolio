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
  windowWidth,
  contentWidth,
  typeState,
  menuState,
  viewState,
  subMenuState,
  subViewState,
  mainTitleState,
  subTitleState,
  menuInfoState,
  menuFold,
}) {
  const router = useRouter();
  const [type, setType] = typeState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [view, setView] = viewState;
  const [subView, setSubView] = subViewState;
  const [mainTitle, setMainTitle] = mainTitleState;
  const [subTitle, setSubTitle] = subTitleState;
  const [menuInfo, setMenuInfo] = menuInfoState;
  const [loadState, setLoadState] = useState({
    post: false,
    portpolio: true,
    career: false,
  });
  const refObj = {
    post: useRef(null),
    portpolio: useRef(null),
    career: useRef(null),
  };
  const portpoliMenu = [
    { id: "pub", name: "HTML&CSS" },
    { id: "js", name: "VanillaJs" },
    { id: "vue", name: "VueJs" },
    { id: "react", name: "ReactJs" },
  ];
  const makeMainTitle = useCallback(
    (menu) => {
      let title = null;
      if (menu === "post") {
        title = (
          <>
            <div className={cx("mainTitleText")}>{"새로운 글"}</div>
            <div className={cx("mainSubTitleText")} onClick={goPosts}>
              {"더 많은 글 보러가기 > "}
            </div>
          </>
        );
      } else if (menu === "portpolio") {
        title = (
          <>
            <div className={cx("mainTitleText")}>{"포트폴리오"}</div>
            <Menus
              menus={portpoliMenu}
              menu={subView}
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
      return <div className={cx("title", "main")}>{title}</div>;
    },
    [subView]
  );
  const makeSubTitle = useCallback((menu, subMenu) => {
    let subTitle = null;
    if (menu === "post") {
      subTitle = (
        <>
          <div className={cx("mainTitleText")}>{"새로운 글"}</div>
          <div className={cx("mainSubTitleText")} onClick={goPosts}>
            {"더 많은 글 보러가기 > "}
          </div>
        </>
      );
    } else if (menu === "portpolio") {
      let text = null;
      switch (subMenu) {
        case "pub":
          text = "HTML&CSS";
          break;
        case "js":
          text = "VanillaJs";
          break;
        case "vue":
          text = "VueJs";
          break;
        case "react":
          text = "ReactJs";
          break;
        default:
          text = "프론트엔드 언어 및 Framework";
      }
      subTitle = <div className={cx("mainTitleText")}>{text}</div>;
    } else if (menu === "career") {
      subTitle = (
        <Col span={24} className={cx("mainTitleText")}>
          {"커리어"}
        </Col>
      );
    }
    return (
      <div className={cx("title", "sub", { hide: menuFold })}>{subTitle}</div>
    );
  });
  const goPosts = useCallback(
    (menu) => {
      setType(null);
      setMenu(null);
      setView(null);
      setMainTitle(null);
      setSubView(null);
      setSubMenu(null);
      setSubTitle(null);
      setLoadState({
        post: false,
        portpolio: true,
        career: false,
      });
      setMenuInfo(null);
      router.push({ pathname: "/posts", query: { menu } });
    },
    [router]
  );
  //화면진입 //스크롤로 화면변경
  useEffect(() => {
    setType("home");
    setMenuInfo([
      {
        id: "post",
        name: "새로운 포스트",
        sub: [],
      },
      {
        id: "portpolio",
        name: "포트폴리오",
        sub: [
          { id: "pub", name: "HTML&CSS" },
          { id: "js", name: "VanillaJs" },
          { id: "vue", name: "VueJs" },
          { id: "react", name: "ReactJs" },
        ],
      },
      { id: "career", name: "커리어", sub: [] },
    ]);
    setMenu({ id: "post" });
    const option = {
      rootMargin: "-40% 0% -60% 0%",
    };
    const interSectionCallback = (entry) => {
      const { view } = entry.target.dataset;
      setView(view);
    };
    makeObserver(option, refObj, interSectionCallback);
  }, []);

  // 메뉴  변경
  useEffect(() => {
    if (!menu) return;
    const { id } = menu;
    if (!id) return;
    if (id === "home" || id === "post") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setView("post");
    } else {
      window.scrollTo({
        top: refObj[id].current.offsetTop - 40,
        behavior: "smooth",
      });
      setView(id);
    }
  }, [menu]);

  // 화면 변경
  useEffect(() => {
    if (!view) return;
    setMainTitle(makeMainTitle(view));
    const newLoadState = { ...loadState };
    newLoadState[view] = true;
    setLoadState({ ...newLoadState });
    if (view === "post" || view == "career") {
      setSubMenu(null);
    }
  }, [view]);

  return (
    <>
      <div className={cx("componentWrapper", "post")}>
        <div
          ref={refObj["post"]}
          data-view="post"
          className={cx("component", "animate", { load: loadState["post"] })}
        >
          <Post
            posts={posts}
            windowWidth={windowWidth}
            contentWidth={contentWidth}
            makeSubTitle={makeSubTitle}
          />
        </div>
      </div>
      <div className={cx("componentWrapper", "portpolio")}>
        <div
          ref={refObj["portpolio"]}
          data-view="portpolio"
          className={cx("component")}
        >
          <PortPolio
            portpolios={portpolios}
            windowWidth={windowWidth}
            contentWidth={contentWidth}
            subMenuState={subMenuState}
            subViewState={subViewState}
            makeSubTitle={makeSubTitle}
          />
        </div>
      </div>

      <div className={cx("componentWrapper", "career")}>
        <div
          ref={refObj["career"]}
          data-view="career"
          className={cx("component", "animate", { load: loadState["career"] })}
        >
          <Career
            career={career}
            windowWidth={windowWidth}
            contentWidth={contentWidth}
            makeSubTitle={makeSubTitle}
          />
        </div>
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
