import SanityService from "../services/SanityService";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
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
  width,
  setTarget,
  typeState,
  viewState,
  menuState,
  subMenuState,
  subViewState,
  subTitleState,
}) {
  const router = useRouter();
  const devPosts = [...posts, ...posts, ...posts];
  const devRef = useRef(null);
  const lifeRef = useRef(null);
  const reviewRef = useRef(null);
  const [type, setType] = typeState;
  const [menu, setMenu] = menuState;
  const [subMenu, setSubMenu] = subMenuState;
  const [view, setView] = viewState;
  const [subView, setSubView] = subViewState;
  const [subTitle, setSubTitle] = subTitleState;
  const ref = useMemo(() => {
    return {
      dev: devRef,
      life: lifeRef,
      review: reviewRef,
    };
  }, [devRef, lifeRef, reviewRef]);

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
  //화면진입 //스크롤로 화면변경
  useEffect(() => {
    setType("posts");
    setMenu("post");
    router.query.menu ? setSubMenu(router.query.menu) : setSubMenu("dev");
    const option = {
      rootMargin: "-50% 0% -50% 0%",
    };
    const interSectionCallback = (entry) => {
      const menu = entry.target.dataset.idx;
      setMenu(null);
      setSubView(menu);
    };
    const io = makeObserver(option, ref, interSectionCallback);
  }, []);
  // 메뉴 변경
  useEffect(() => {
    if (!menu || menu === "post") return;
    if (menu === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setSubMenu("dev");
    } else {
      goHome(menu);
    }
  }, [menu]);
  //하위메뉴 변경
  useEffect(() => {
    if (!subMenu) return;
    if (subMenu === "new") {
      goHome("post");
      return;
    } else {
      window.scrollTo({
        top: ref[subMenu].current.offsetTop,
        behavior: "smooth",
      });
      setSubView(subMenu);
    }
  }, [subMenu]);
  // 화면 변경
  useEffect(() => {
    setSubTitle(makeSubTitle(subView));
  }, [subView]);
  return (
    <>
      <div className={cx("componentWrapper")} ref={devRef} data-idx="dev">
        <div className={cx("postWrapper")}>
          {devPosts.map((post, idx) => {
            return makeElement(post, idx);
          })}
        </div>
      </div>
      <div className={cx("componentWrapper")} ref={lifeRef} data-idx="life">
        <div className={cx("postWrapper")}>
          {devPosts.map((post, idx) => {
            return makeElement(post, idx);
          })}
        </div>
      </div>
      <div className={cx("componentWrapper")} ref={reviewRef} data-idx="review">
        <div className={cx("postWrapper")}>
          {devPosts.map((post, idx) => {
            return makeElement(post, idx);
          })}
        </div>
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
      profile,
      posts,
    },
  };
}
