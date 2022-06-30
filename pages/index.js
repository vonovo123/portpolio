import styles from "../styles/Home.module.css";
import SanityService from "../services/SanityService";
import Header from "../components/Header";
import HeadLine from "../components/HeadLine";
import Career from "../components/Career";
import PortPolio from "../components/PortPolio";
import PostList from "../components/PostList";
import Footer from "../components/Footer";
import About from "../components/About";
import { useEffect, useMemo, useState } from "react";
import { throttle } from "lodash";
import GitProfileService from "../services/GitProfileService";
export default function Home({ home, devLog, profile, portpolios, career }) {
  const [view, setView] = useState("home");
  //const mainPost = posts.find((post) => post.slug === home.mainPostUrl);
  profile = profile[0];
  const html = portpolios.filter(
    (portpolio) => portpolio.category.type === "html/css"
  );
  const vanillaJs = portpolios.filter(
    (portpolio) => portpolio.category.type === "vanillaJs"
  );
  const vueNuxt = portpolios.filter(
    (portpolio) => portpolio.category.type === "vueNuxt"
  );
  const reactNext = portpolios.filter(
    (portpolio) => portpolio.category.type === "reactNext"
  );
  const intro = home.find((content) => content.title === "Introduction");
  const moveScrollbyNav = (target) => {
    setView(target);
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.scrollTo({
        top: document.querySelector(`#${target}`).offsetTop - 100,
        behavior: "auto",
      });
    }
  };
  useEffect(() => {
    getView();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", throttleGetView);
    return () => {
      window.removeEventListener("scroll", throttleGetView);
    };
  });

  const throttleGetView = throttle(() => {
    const { scrollY } = window;
    const careerTop = document.querySelector("#career").offsetTop;
    const carrerBottom =
      careerTop + document.querySelector("#career").offsetHeight;
    const portpolioTop = document.querySelector("#portpolio").offsetTop;
    const portpolioBottom =
      portpolioTop + document.querySelector("#portpolio").offsetHeight;
    // const postTop = document.querySelector("#post").offsetTop;
    // const postBottom = postTop + document.querySelector("#post").offsetHeight;
    const aboutTop = document.querySelector("#about").offsetTop;
    const aboutBottom =
      aboutTop + document.querySelector("#about").offsetHeight;
    scrollY = Number(scrollY) + 400;
    if (scrollY > 400 && scrollY <= carrerBottom) {
      setView("career");
    } else if (scrollY >= portpolioTop && scrollY <= portpolioBottom) {
      setView("portpolio");
    }
    // } else if (scrollY >= postTop && scrollY <= postBottom) {
    //   setView("post");
    else if (scrollY >= aboutTop && scrollY <= aboutBottom) {
      setView("about");
    } else {
      setView("home");
    }
  }, 500);
  const getView = (e) => {};
  return (
    <div>
      <div className={styles.header}>
        <Header view={view} moveScrollbyNav={moveScrollbyNav} showNav={true} />
      </div>
      <div className={styles.container}>
        <HeadLine devLog={devLog} />
        <Career view={view} career={career} />
        <PortPolio
          html={html}
          vanillaJs={vanillaJs}
          vueNuxt={vueNuxt}
          view={view}
          reactNext={reactNext}
        />
        {/* <PostList
          posts={otherPosts}
          view={view}
          throttleGetView={throttleGetView}
        /> */}
        <About view={view} profile={profile} intro={intro} />
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
  // const posts = await sanityService.getPosts();
  const portpolios = await sanityService.getPortpolio();
  //const profile = await gitProfileService.getProfile();
  const career = await sanityService.getCareer();
  const devLog = await sanityService.getDevLog();
  const profile = await sanityService.getProfile();
  console.log(profile);
  return {
    props: {
      home,
      //posts,
      profile,
      portpolios,
      career,
      devLog,
    },
  };
}
