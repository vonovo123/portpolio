import styles from "../styles/Home.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import SanityService from "../services/SanityService";
import Header from "../components/Header/Header";
import Career from "../components/Career";
import PortPolio from "../components/Portpolio/PortPolio";
import Post from "../components/Post/Post";
import Footer from "../components/Footer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GitProfileService from "../services/GitProfileService";
import _ from "lodash";
import Title from "../components/Title";

export default function Home({ home, posts, profile, portpolios, career }) {
  profile = profile[0];
  const [width, setWidth] = useState();
  const [portpolioMenu, setPortpolioMenu] = useState("ALL");
  const postRef = useRef(null);
  const portRef = useRef(null);
  const careerRef = useRef(null);
  const ref = useMemo(() => {
    return {
      post: postRef,
      portpolio: portRef,
      career: careerRef,
    };
  }, [postRef, portRef, careerRef]);
  const headerMenus = [
    { id: "post", name: "최근 글" },
    { id: "portpolio", name: "포트폴리오" },
    { id: "career", name: "커리어" },
  ];
  const titleMenus = {
    post: "최근 글",
    portpolio: "포트폴리오",
    career: "커리어",
  };
  const [view, setView] = useState("post");
  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const navClickEvent = useCallback(
    (target) => {
      setView(target);
      if (target === "home" || target === "post") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: ref[target].current.offsetTop,
          behavior: "smooth",
        });
      }
    },
    [setView, ref]
  );

  useEffect(() => {
    const option = {
      rootMargin: "-50% 0% -50% 0%",
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setView(entry.target.dataset.idx);
        }
      });
    }, option);
    io.observe(postRef.current);
    io.observe(portRef.current);
    io.observe(careerRef.current);
  }, []);
  return (
    <div className={cx("wrapper")}>
      <Header
        view={view}
        navClickEvent={navClickEvent}
        type={"index"}
        profile={profile}
        width={width}
        menus={headerMenus}
      />
      <div className={cx("container", "title")}>
        <Title
          view={view}
          type={view}
          show={true}
          menu={portpolioMenu}
          setMenu={setPortpolioMenu}
          menus={titleMenus}
        ></Title>
      </div>
      <div className={cx("container")} ref={postRef} data-idx="post">
        <Post posts={posts} view={view} width={width} show={true} />
      </div>
      <div className={cx("container")} ref={portRef} data-idx="portpolio">
        <PortPolio
          portpolios={portpolios}
          view={view}
          width={width}
          show={true}
          menu={portpolioMenu}
        />
      </div>
      <div className={cx("container")} ref={careerRef} data-idx="career">
        <Career
          view={view}
          career={career}
          width={width}
          careerRef={careerRef}
        />
      </div>
      <Footer />
    </div>
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
