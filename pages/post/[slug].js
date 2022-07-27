import SanityService from "../../services/SanityService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Slug.module.css";
import BlogPostDetail from "../../components/BlogPostDetail";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import { Col, Image, Row } from "antd";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import BreadCrumb from "../../components/BreadCrumb";
import TableOfContents from "../../components/TableOfContents";
import { makeHeadings } from "../../utils/makeHeadings";
const cx = classNames.bind(styles);
export default function Post({ slug, post }) {
  const router = useRouter();
  const [view, setView] = useState("home");
  const [width, setWidth] = useState();
  const [openToc, setOpenToc] = useState(false);
  const [readKey, setReadkey] = useState({ flag: false });
  const observed = useRef(null);
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
  const breadCrumbParam = [
    () => (
      <div
        onClick={() => {
          router.push({ pathname: "/posts", query: { menu: "개발" } });
        }}
      >
        {"POSTS"}
      </div>
    ),
    slug.toUpperCase(),
  ];
  const [heading, setHeading] = useState([]);
  useEffect(() => {
    const topOption = { rootMargin: "-20% 0% -80% 0%" };
    const bottomOption = { rootMargin: "-60% 0% -40% 0%" };
    const topIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setOpenToc(true);
        }
      });
    }, topOption);
    topIo.observe(observed.current);
    const bottomIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setOpenToc(false);
        }
      });
    }, bottomOption);

    bottomIo.observe(observed.current);
  }, []);
  useEffect(() => {
    const option = {
      rootMargin: "-20% 0% -80% 0%",
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setReadkey(entry.target._key);
        }
      });
    }, option);
    const $nodes = document.querySelector("#content");
    let ast = [...$nodes.childNodes];
    const headings = makeHeadings({ ast, io });
    setHeading(headings);
  }, []);

  return (
    <div className={cx("slug")}>
      <TableOfContents
        outline={heading}
        openToc={openToc}
        readKey={readKey}
        setOpenToc={setOpenToc}
      ></TableOfContents>
      <div className={cx("wrapper")}>
        <Header
          view={view}
          width={width}
          type={"postDetail"}
          navClickEvent={navClickEvent}
        />
        <div className={cx("container", "mb30")}>
          <Row className={cx("contentHeaderWrapper")}>
            <div className={cx("breadCrumbWrapper", "mb50")}>
              <BreadCrumb params={breadCrumbParam}></BreadCrumb>
            </div>
            <Col span={24} align={"center"}>
              <Image
                src={post.thumbnail.imageUrl}
                alt={post.thumbnail.alt}
                className={cx("postImage", "mb30")}
                preview={false}
              />
            </Col>
            <Col span={24} align={"center"}>
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
              </div>
            </Col>
            <div ref={observed} className={cx("observe")}>
              obs
            </div>
          </Row>
          <div className={cx("contentBody")}>
            <BlogPostDetail
              blocks={post.content}
              markdown={post.postContent.markdown}
              heading={heading}
            />
          </div>
          <Footer />
        </div>
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
