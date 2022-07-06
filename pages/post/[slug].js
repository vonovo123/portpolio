import SanityService from "../../services/SanityService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";
import slugStyles from "../../styles/Slug.module.css";
import BlogPostDetail from "../../components/BlogPostDetail";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PostAll({ slug, post }) {
  const router = useRouter();
  const [view, setView] = useState("home");
  const goBack = () => {
    router.back();
  };
  const navClickEvent = (target) => {
    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      goBack();
    }
  };
  const backBtnMouseHoverEvent = (view) => {
    setView(view);
  };
  return (
    <div>
      <div className={styles.header}>
        <Header
          view={view}
          type={"detail"}
          navClickEvent={navClickEvent}
          backBtnMouseHoverEvent={backBtnMouseHoverEvent}
        />
      </div>
      <div className={styles.container}>
        <div className={slugStyles.contentHeader}>
          <h2>{post.title}</h2>
        </div>
        <div className={slugStyles.contentMain}>
          <BlogPostDetail blocks={post.content} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const sanityService = new SanityService();
  const posts = await sanityService.getPosts();
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { slug } = params;
  const sanityService = new SanityService();
  const posts = await sanityService.getPosts();
  const post = posts.find((post) => post.slug === slug);
  return {
    props: {
      slug,
      post,
    },
  };
}
