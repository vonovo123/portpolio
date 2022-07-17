import styles from "../styles/Home.module.css";
import SanityService from "../services/SanityService";
import Header from "../components/Header";
import HeadLine from "../components/HeadLine";
import Career from "../components/Career";
import PortPolio from "../components/PortPolio";
import Post from "../components/Post";
import Footer from "../components/Footer";
import About from "../components/About";
import { useCallback, useEffect, useMemo, useState } from "react";
import GitProfileService from "../services/GitProfileService";
export default function Home({
  home,
  posts,
  devLog,
  profile,
  portpolios,
  career,
}) {
  const [width, setWidth] = useState();
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);
  const [view, setView] = useState("home");
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
  const intro = home.find((content) => content.title === "Introduction");
  const navClickEvent = useCallback(
    (target) => {
      setView(target);
      if (target === "home") {
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        window.scrollTo({
          top: document.querySelector(`#${target}`).offsetTop - 100,
          behavior: "auto",
        });
      }
    },
    [setView]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "-20% 0% -80% 0%",
      threshold: 0.0,
    };
    // const headerOption = {
    //   root: null,
    //   rootMargin: "-15% 0% 0% 0%",
    //   threshold: 0.0,
    // };
    // const $headLine = document.querySelector("#headLine");
    // const Ho = new IntersectionObserver((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       setView("home");
    //     }
    //   });
    // }, headerOption);
    //Ho.observe($headLine);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setView(entry.target.dataset.idx);
        }
      });
    }, option);
    const $career = document.querySelector("#career");
    const $portpolio = document.querySelector("#portpolio");
    const $post = document.querySelector("#post");
    const $about = document.querySelector("#about");
    io.observe($career);
    io.observe($portpolio);
    io.observe($post);
    io.observe($about);
  }, []);
  return (
    <div className={styles.wrapper}>
      <Header
        view={view}
        navClickEvent={navClickEvent}
        type={"index"}
        width={width}
        title={"WFDL [Web Frontend Development Log]"}
      />
      <div className={styles.container} id="rootContainer">
        {/* <HeadLine devLog={devLog} /> */}
        <Career view={view} career={career} width={width} />
        <PortPolio
          html={html}
          vanillaJs={vanillaJs}
          vueNuxt={vueNuxt}
          view={view}
          reactNext={reactNext}
          width={width}
        />
        <Post posts={posts} view={view} width={width} showTitle={true} />
        <About view={view} profile={profile} intro={intro} width={width} />
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  //sanity로 부터 데이터를 가져온다. getStaticProps 만 써야함
  const sanityService = new SanityService();
  const gitProfileService = new GitProfileService();
  const home = await sanityService.getHome();
  const posts = await sanityService.getPosts();
  const portpolios = await sanityService.getPortpolio();
  const career = await sanityService.getCareer();
  const devLog = await sanityService.getDevLog();
  const profile = await sanityService.getProfile();
  return {
    props: {
      home,
      posts,
      profile,
      portpolios,
      career,
      devLog,
    },
  };
}
