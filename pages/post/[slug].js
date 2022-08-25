import SanityService from "../../services/SanityService";
import styles from "../../styles/Slug.module.css";
import BlogMarkDown from "../../components/BlogMarkDown";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Col, Image, Row } from "antd";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import BreadCrumb from "../../components/BreadCrumb";
import TableOfContents from "../../components/TableOfContents";
import { makeHeadings } from "../../utils/Headings";
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
  // useEffect(() => {
  //   const topOption = { rootMargin: "-20% 0% -80% 0%" };
  //   const bottomOption = { rootMargin: "-60% 0% -40% 0%" };
  //   const topIo = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setOpenToc(true);
  //       }
  //     });
  //   }, topOption);
  //   topIo.observe(observed.current);
  //   const bottomIo = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setOpenToc(false);
  //       }
  //     });
  //   }, bottomOption);

  //   bottomIo.observe(observed.current);
  // }, []);
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
    <>
      {/* <TableOfContents
        outline={heading}
        openToc={openToc}
        readKey={readKey}
        setOpenToc={setOpenToc}
      ></TableOfContents> */}
      <div className={cx("wrapper")}>
        <Row className={cx("contentHeaderWrapper")}>
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
            observe
          </div>
        </Row>
        <div className={cx("contentBody")}>
          <BlogMarkDown markdown={post.postContent.markdown} />
        </div>
      </div>
    </>
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
  const profile = await sanityService.getProfile();
  return {
    props: {
      slug,
      post,
      profile,
    },
  };
}
