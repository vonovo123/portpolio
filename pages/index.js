import styles from "../styles/Home.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

import SanityService from "../services/SanityService";
import Header from "../components/Header/Header";
import Career from "../components/Career";
import PortPolio from "../components/Portpolio/PortPolio";
import Post from "../components/Post/Post";
import Footer from "../components/Footer";
import About from "../components/About";
import { useCallback, useEffect, useRef, useState } from "react";
import GitProfileService from "../services/GitProfileService";
import _ from "lodash";

export default function Home({ home, posts, profile, portpolios, career }) {
  const [width, setWidth] = useState();
  const careerRef = useRef(null);
  const postRef = useRef(null);
  const portRef = useRef(null);
  const aboutRef = useRef(null);
  const ref = {
    career: careerRef,
    post: postRef,
    portpolio: portRef,
    about: aboutRef,
  };
  const intro = home.find((content) => content.title === "Introduction");
  const [view, setView] = useState("post");
  const moveScroll = _.debounce((dir) => {
    let next = view;
    if (dir > 0) {
      if (view === "post") {
        next = "portpolio";
      } else if (view === "portpolio") {
        next = "about";
      }
    } else {
      if (view === "about") {
        next = "portpolio";
      } else if (view === "portpolio") {
        next = "post";
      }
    }
    if (view === next) return;
    setView(next);
    window.scrollTo({
      top: ref[next].current.offsetTop,
    });
  }, 100);
  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);
  const handelScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    moveScroll(e.deltaY);
    return false;
  };
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
  // useEffect(() => {
  //   window.addEventListener("wheel", handelScroll, { passive: false });
  //   return () => window.removeEventListener("wheel", handelScroll);
  // }, [view]);

  let html = [],
    vanillaJs = [],
    vueNuxt = [],
    reactNext = [];
  profile = profile[0];
  portpolios.forEach((portpolio) => {
    if (portpolio.category.type === "html/css") {
      html.push({ ...portpolio });
    } else if (portpolio.category.type === "vanillaJs") {
      vanillaJs.push({ ...portpolio });
    } else if (portpolio.category.type === "vueNuxt") {
      vueNuxt.push({ ...portpolio });
    } else if (portpolio.category.type === "reactNext") {
      reactNext.push({ ...portpolio });
    }
  });
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
    [setView]
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
    io.observe(aboutRef.current);
  }, []);
  return (
    <div className={cx("wrapper")}>
      <Header
        view={view}
        navClickEvent={navClickEvent}
        type={"index"}
        width={width}
      />
      <div className={cx("container")} ref={postRef} data-idx="post">
        <Post posts={posts} view={view} width={width} show={true} />
      </div>
      <div className={cx("container")} ref={portRef} data-idx="portpolio">
        <PortPolio
          html={html}
          vanillaJs={vanillaJs}
          vueNuxt={vueNuxt}
          reactNext={reactNext}
          view={view}
          width={width}
          show={true}
        />
      </div>
      <div className={cx("container")} ref={aboutRef} data-idx="about">
        {/* <Career
            view={view}
            career={career}
            width={width}
            careerRef={careerRef}
          /> */}
        <About view={view} profile={profile} intro={intro} width={width} />
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
