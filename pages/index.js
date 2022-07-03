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
import GitProfileService from "../services/GitProfileService";
export default function Home({
  home,
  posts,
  devLog,
  profile,
  portpolios,
  career,
}) {
  const [view, setView] = useState("home");
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
  const navClickEvent = (target) => {
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
    const option = {
      root: null,
      rootMargin: "-20% 0% -80% 0%",
      threshold: 0.0,
    };
    const headerOption = {
      root: null,
      rootMargin: "-15% 0% 0% 0%",
      threshold: 0.0,
    };
    const $headLine = document.querySelector("#headLine");
    const Ho = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setView("home");
        }
      });
    }, headerOption);
    Ho.observe($headLine);
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
    <div>
      <div className={styles.header}>
        <Header view={view} navClickEvent={navClickEvent} type={"index"} />
      </div>
      <div className={styles.container} id="rootContainer">
        <HeadLine devLog={devLog} />
        <Career view={view} career={career} />
        <PortPolio
          html={html}
          vanillaJs={vanillaJs}
          vueNuxt={vueNuxt}
          view={view}
          reactNext={reactNext}
        />
        <PostList posts={posts} view={view} />
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
