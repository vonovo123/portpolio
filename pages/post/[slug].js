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
import { CaretLeftOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function Post({
  post,
  pageState,
  menuState,
  menuInfoState,
  setHideAbout,
}) {
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [menuInfo, setMenuInfo] = menuInfoState;
  const [readKey, setReadkey] = useState({ flag: false });
  const sod = useRef(null);
  const eod = useRef(null);
  const [heading, setHeading] = useState([]);
  const [foldToc, setFoldToc] = useState(false);
  useEffect(() => {
    setPage("post");
    setMenu("post");
    setHideAbout("true");
    setMenuInfo({});
    const option = {
      rootMargin: "-10% 0% -90% 0%",
    };

    const $contentNode = document.querySelector("#content");
    const cb = (entry) => {
      setReadkey(entry.target.dataset.idx);
    };
    const io = makeObserver(option, cb);
    io.observe(sod.current);
    io.observe(eod.current);
    const contentCb = (entry) => {
      setReadkey(entry.target._key);
    };
    const contentIo = makeObserver(option, contentCb);
    let ast = [sod.current, ...$contentNode.childNodes, eod.current];
    const headings = makeHeadings({ ast, io: contentIo });
    setHeading(headings);
  }, []);
  return (
    <div className={cx("post")}>
      <div className={cx("tocWrapper", { fold: foldToc })}>
        <TableOfContents
          outline={heading}
          readKey={readKey}
          setFoldToc={setFoldToc}
        ></TableOfContents>
      </div>
      <div
        className={cx("tocFold", { fold: !foldToc })}
        onClick={() => {
          setFoldToc(false);
        }}
      >
        <div className={cx("btn")}>
          <CaretLeftOutlined />
        </div>
        <div className={cx("text")}>TOC</div>
      </div>
      <Row className={cx("contentHeaderWrapper")} ref={sod} data-idx={"sod"}>
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
            <div className={cx("createdAt")}>
              {dayjs(post.createdAt).format("MMMM DD / YYYY ")}
            </div>
          </div>
        </Col>
      </Row>
      <div className={cx("contentBody")}>
        <BlogMarkDown markdown={post.postContent.markdown} />
      </div>
      <div className={cx("eod")} ref={eod} data-idx={"eod"}></div>
    </div>
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
