import SanityService from "../../services/SanityService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Slug.module.css";
import BlogPostDetail from "../../components/BlogPostDetail";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Image } from "antd";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import BreadCrumb from "../../components/BreadCrumb";
const cx = classNames.bind(styles);
export default function Post({ slug, post }) {
  const router = useRouter();
  const [view, setView] = useState("home");
  const [width, setWidth] = useState();
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);
  const goBack = () => {
    router.back();
  };
  const navClickEvent = (target) => {
    if (target === "home") {
      router.push("/");
    } else {
      goBack();
    }
  };
  const backBtnMouseHoverEvent = (view) => {
    setView(view);
  };
  const breadCrumbParam = [
    () => (
      <div
        onClick={() => {
          router.push({ pathname: "/posts", query: { menu: "개발" } });
        }}
      >
        {post.category.name}
      </div>
    ),
    slug.toUpperCase(),
  ];

  return (
    <div className={styles.wrapper}>
      <Header
        view={view}
        width={width}
        type={"postDetail"}
        navClickEvent={navClickEvent}
        backBtnMouseHoverEvent={backBtnMouseHoverEvent}
      />
      <div className={cx("container", "mb30")}>
        <BreadCrumb params={breadCrumbParam}></BreadCrumb>
        <div className={cx("contentHeader")}>
          <div className={cx("title", "mb20")}>{post.title}</div>
          <div className={cx("subTitle", "mb20")}>{post.subtitle}</div>
          <div className={cx("createdAt", "mb20")}>
            {dayjs(post.createdAt).format("MMMM DD / YYYY ")}
          </div>
          <div className={cx("tags", "mb20")}>
            {post.tag.map((tag, idx) => (
              <div key={idx} className={cx("tag")}>
                {tag.title}
              </div>
            ))}
          </div>
          <Image
            src={post.thumbnail.imageUrl}
            alt={post.thumbnail.alt}
            className={cx("postImage", "mb30")}
            preview={false}
          />
        </div>
        <div className={styles.contentBody}>
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
