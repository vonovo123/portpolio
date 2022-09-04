import SanityService from "../services/SanityService";
import styles from "../styles/Posts.module.css";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import BreadCrumb from "../components/BreadCrumb";
import PostElement from "../components/Post/PostElement";
import makeObserver from "../utils/Observer";
import { Col } from "antd";

const cx = classNames.bind(styles);
export default function Posts({
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
  const devPosts = [...posts, ...posts, ...posts];
  const [type, setType] = typeState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [view, setView] = viewState;
  const [subView, setSubView] = subViewState;
  const [mainTitle, setMainTitle] = mainTitleState;
  const [subTitle, setSubTitle] = subTitleState;
  const [menuInfo, setMenuInfo] = menuInfoState;
  const [loadState, setLoadState] = useState({
    dev: false,
    life: false,
    review: false,
  });
  const refObj = {
    dev: useRef(null),
    life: useRef(null),
    review: useRef(null),
  };

  const makeMainTitle = useCallback((menu) => {
    let title = null;
    if (menu === "dev") {
      title = "개발";
    } else if (menu === "life") {
      title = "일상";
    } else if (menu === "review") {
      title = "리뷰";
    }
    return <BreadCrumb params={["포스트", title]}></BreadCrumb>;
  }, []);
  const makeSubTitle = useCallback((menu) => {
    let subTitle = null;
    if (menu === "dev") {
      subTitle = "웹 개발에 대한 글을 기록하는 곳입니다..";
    } else if (menu === "life") {
      subTitle = "일상생활을 기록하는 곳입니다.";
    } else if (menu === "review") {
      subTitle = "즐거운 경험을 기록하는 곳입니다.";
    }
    return <Col className={cx("postSubtitle")}>{subTitle}</Col>;
  }, []);
  const makeElement = useCallback((element, idx) => {
    return (
      <div className={cx("postElement")} key={idx}>
        <PostElement element={element}></PostElement>
      </div>
    );
  }, []);
  const goDetail = useCallback(
    (slug) => {
      router.push(`/post/${slug}`);
    },
    [router]
  );
  const goHome = useCallback(
    (menu) => {
      setType(null);
      setSubMenu(null);
      setSubTitle(null);
      router.push({ pathname: "/", query: { menu } });
    },
    [router]
  );
  //화면진입 //스크롤로 화면변경
  useEffect(() => {
    setType("posts");
    setMenuInfo([
      {
        id: "dev",
        name: "개발",
        sub: [],
      },
      {
        id: "life",
        name: "일상",
        sub: [],
      },
      {
        id: "review",
        name: "후기",
        sub: [],
      },
    ]);
    setMenu({ id: "dev" });
    const option = {
      rootMargin: "-40% 0% -60% 0%",
    };
    const interSectionCallback = (entry) => {
      const { view } = entry.target.dataset;
      setView(view);
    };
    makeObserver(option, refObj, interSectionCallback);
  }, []);
  //메뉴 변경
  useEffect(() => {
    if (!menu) return;
    const { id } = menu;
    if (!id) return;
    if (id === "home" || id === "dev") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setView("dev");
    } else {
      window.scrollTo({
        top: refObj[id].current.offsetTop - 40,
        behavior: "smooth",
      });
      setView(id);
    }
  }, [menu]);
  //하위메뉴 변경
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
      <div className={cx("componentWrapper", "dev")}>
        <div
          className={cx("component", "animate", { load: loadState["dev"] })}
          ref={refObj["dev"]}
          data-view="dev"
        >
          {devPosts.map((post, idx) => {
            return makeElement(post, idx);
          })}
        </div>
      </div>
      <div className={cx("componentWrapper", "life")}>
        <div
          className={cx("component", "animate", { load: loadState["life"] })}
          ref={refObj["life"]}
          data-view="life"
        >
          {devPosts.map((post, idx) => {
            return makeElement(post, idx);
          })}
        </div>
      </div>
      <div className={cx("componentWrapper", "review")}>
        <div
          className={cx("component", "animate", { load: loadState["review"] })}
          ref={refObj["review"]}
          data-view="review"
        >
          {devPosts.map((post, idx) => {
            return makeElement(post, idx);
          })}
        </div>
      </div>
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
      profile,
      posts,
    },
  };
}
