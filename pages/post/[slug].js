import SanityService from "../../services/SanityService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Slug.module.css";
import BlogPostDetail from "../../components/BlogPostDetail";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Col, Image, Row } from "antd";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import BreadCrumb from "../../components/BreadCrumb";
import TableOfContents from "../../components/TableOfContents";
const cx = classNames.bind(styles);
export default function Post({ slug, post }) {
  const router = useRouter();
  const [view, setView] = useState("home");
  const [width, setWidth] = useState();
  const [openToc, setOpenToc] = useState(true);
  const [readKey, setReadkey] = useState("");
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

  useEffect(() => {}, []);

  const [heading, setHeading] = useState([]);
  useEffect(() => {
    const option = {
      rootMargin: "-30% 0% -70% 0%",
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(entry.target._key);
          setReadkey(entry.target._key);
        }
      });
    }, option);
    const $nodes = document.querySelector("#content");
    let ast = [...$nodes.childNodes];

    const filter = (ast, match) => {
      const result = ast.reduce((acc, node) => {
        if (match(node)) {
          const key = Math.floor(Math.random() * 100000) + "";
          node._key = "key_" + key;
          node = {
            el: node,
            tagName: node.tagName,
            level: node.tagName.slice(1),
          };
          io.observe(node.el);
          acc.push(node);
        }
        if (node.children) acc.push(...filter([...node.children], match));

        return acc;
      }, []);
      //console.log(result);
      return result;
    };

    const findHeadings = (ast) => {
      return filter(ast, (node) => /H\d/.test(node.tagName));
    };
    const outline = { subheadings: [] };
    const headings = findHeadings(ast);
    const path = [];
    let lastLevel = 0;
    const get = (object, path) => {
      const result = path.reduce((prev, curr) => {
        return prev[curr];
      }, object);
      return result;
    };
    const getObjectPath = (path) => {
      return path.length === 0
        ? path
        : ["subheadings"].concat(path.join(".subheadings.").split("."));
    };
    headings.forEach((heading) => {
      const level = Number(heading.tagName.slice(1));
      heading.subheadings = [];
      if (level < lastLevel) {
        for (let i = lastLevel; i >= level; i--) path.pop();
      } else if (level === lastLevel) path.pop();
      const prop = get(outline, getObjectPath(path));
      prop.subheadings.push(heading);
      path.push(prop.subheadings.length - 1);
      lastLevel = level;
    });
    setHeading(outline.subheadings);
  }, []);

  return (
    <div>
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
          <BreadCrumb params={breadCrumbParam}></BreadCrumb>
          <Row className={cx("contentHeaderWrapper")}>
            <Col span={24}>
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
            </Col>
          </Row>

          <div className={styles.contentBody}>
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
