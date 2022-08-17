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
import { Col } from "antd";
import { useRouter } from "next/router";
export default function Home({
  posts,
  portpolios,
  career,
  width,
  typeState,
  menuState,
  viewState,
  subMenuState,
  subViewState,
  subTitleState,
}) {
  const router = useRouter();
  const [portpolioMenu, setPortpolioMenu] = useState("ALL");
  const postRef = useRef(null);
  const portRef = useRef(null);
  const careerRef = useRef(null);
  const [type, setType] = typeState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [view, setView] = viewState;
  const [subView, setSubView] = subViewState;
  const [subTitle, setSubTitle] = subTitleState;
  const [portpoloSubMenuBefore, setPortpoloSubMenuBefore] = useState(null);
  const ref = useMemo(() => {
    return {
      post: postRef,
      portpolio: portRef,
      career: careerRef,
    };
  }, [postRef, portRef, careerRef]);
  const makeSubTitle = useCallback((menu, subMenu) => {
    let subTitle = null;
    if (menu === "post") {
      subTitle = "최근 5개의 포스트만 표시됩니다.";
    } else if (menu === "portpolio") {
      let text = null;
      switch (subMenu) {
        case "pub":
          text = "HTML/CSS";
          break;
        case "js":
          text = "JAVASCRIPT";
          break;
        case "vue":
          text = "VUE.JS";
          break;
        case "react":
          text = "REACT.JS";
          break;
        default:
          text = "프론트엔드 언어 및 Framework";
      }
      subTitle = `${text}  를(을) 활용한 토이프로젝트입니다.`;
    } else if (menu === "career") {
      subTitle = "경력 및 이력사항 입니다.";
    }
    return <Col className={cx("postSubtitle")}>{subTitle}</Col>;
  }, []);
  const goPosts = useCallback(
    (menu) => {
      console.log(menu);
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
      rootMargin: "-50% 0% -50% 0%",
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
    if (!subMenu) return;
    if (view === "post" && subMenu !== "new") {
      goPosts(subMenu);
    } else if (view === "portpolio") {
      setSubView(subMenu);
      setPortpoloSubMenuBefore(subMenu);
      setPortpolioMenu(subMenu);
      setSubTitle(makeSubTitle(view, subMenu));
    }
  }, [subMenu]);
  // 화면 변경
  useEffect(() => {
    if (view === "post") {
      setSubView("new");
    } else if (view === "portpolio") {
      !portpoloSubMenuBefore
        ? setSubView("all")
        : setSubView(portpoloSubMenuBefore);
    }
    setSubTitle(makeSubTitle(view, subMenu));
  }, [view]);
  return (
    <>
      <div ref={postRef} data-idx="post" className={cx("componentWrapper")}>
        <Post posts={posts} width={width} show={true} />
      </div>
      <div
        ref={portRef}
        data-idx="portpolio"
        className={cx("componentWrapper")}
      >
        <PortPolio
          portpolios={portpolios}
          width={width}
          show={true}
          menu={portpolioMenu}
        />
      </div>
      <div ref={careerRef} data-idx="career" className={cx("componentWrapper")}>
        <Career career={career} width={width} />
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
