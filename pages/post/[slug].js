import SanityService from "../../services/SanityService";
import styles from "../../styles/Slug.module.css";
import BlogMarkDown from "../../components/BlogMarkDown";
import { useState, useEffect, useRef } from "react";
import { Col, Image, Row } from "antd";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import { makeHeadings } from "../../utils/Headings";
import makeObserver from "../../utils/Observer";
import TableOfContents from "../../components/TableOfContents";
const cx = classNames.bind(styles);
export default function Post({
  slug,
  post,
  pageState,
  menuState,
  menuInfoState,
  goPage,
}) {
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [menuInfo, setMenuInfo] = menuInfoState;
  const [readKey, setReadkey] = useState({ flag: false });
  const observed = useRef(null);
  const [openToc, setOpenToc] = useState(true);
  const [heading, setHeading] = useState([]);

  useEffect(() => {
    setPage("post");
    setMenu("post");
    setMenuInfo({});
    const option = {
      rootMargin: "-20% 0% -80% 0%",
    };
    const cb = (entry) => {
      setReadkey(entry.target._key);
    };
    const $contentNode = document.querySelector("#content");

    const io = makeObserver(option, cb);
    let ast = [...$contentNode.childNodes];
    const headings = makeHeadings({ ast, io });
    setHeading(headings);
  }, []);

  return (
    <>
      <TableOfContents
        outline={heading}
        openToc={openToc}
        readKey={readKey}
        setOpenToc={setOpenToc}
      ></TableOfContents>
      <div className={cx("post")}>
        <Row className={cx("contentHeaderWrapper")}>
          <Col span={24} align={"center"}>
            <Image
              src={post.thumbnail.imageUrl}
              alt={post.thumbnail.alt}
              className={cx("postImage")}
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
            </div>
          </Col>
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
  const posts = await sanityService.getDevPost();
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
  const posts = await sanityService.getDevPost();
  const recentPost = await sanityService.getDevPost();
  const profile = await sanityService.getProfile();
  const post = posts.find((post) => post.slug === slug);

  return {
    props: {
      slug,
      post,
      profile,
      recentPost,
    },
  };
}
