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
import PostTitle from "../../components/PostTitle";
import AdTop from "../../components/AdBanner/AdTop";
const cx = classNames.bind(styles);
export default function Post({
  post,
  pageState,
  subMenuState,
  setHideAbout,
  goPage,
  subCategoryState,
}) {
  const [page, setPage] = pageState;
  const [subMenu, setSubMenu] = subMenuState;
  const [subCategory, setSubcategory] = subCategoryState;
  const [readKey, setReadkey] = useState({ flag: false });
  const sod = useRef(null);
  const eod = useRef(null);
  const [heading, setHeading] = useState([]);
  const [foldToc, setFoldToc] = useState(true);
  const postTitleState = useState(null);
  const [postTitle, setPostTitle] = postTitleState;
  useEffect(() => {
    setHideAbout("true");
    setSubcategory(null);
  }, []);
  useEffect(() => {
    const newTitle = { main: post.category.name, sub: post.subCategory.name };
    setPostTitle(newTitle);
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
  }, [post]);
  useEffect(() => {
    if (!subMenu) return;
    goPage({ def: page });
  }, [subMenu, goPage, page]);
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
      <AdTop></AdTop>
      <PostTitle postTitleState={postTitleState}></PostTitle>
      <div className={cx("contentHeaderWrapper")} ref={sod} data-idx={"sod"}>
        <div className={cx("postImageWrapper")}>
          <Image
            src={post.thumbnail.imageUrl}
            alt={post.thumbnail.alt}
            className={cx("postImage")}
            preview={false}
          />
        </div>
        <div className={cx("contentHeaderInfo")}>
          <div className={cx("title", "mb20")}>{post.title}</div>
          <div className={cx("subTitle", "mb20")}>{post.subtitle}</div>
          <div className={cx("createdAt", "mb10")}>
            {dayjs(post.createdAt).format("MMMM DD / YYYY ")}
          </div>
          <div className={cx("contentAuthor")}>
            <Image
              src={post.author.image}
              alt={post.author.name}
              className={cx("authorImage")}
              preview={false}
            />
            <div className={cx("authorNameWrapper")}>
              <div className={cx("authorName")}>{post.author.name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("contentBody")}>
        <BlogMarkDown markdown={post.postContent.markdown} />
      </div>
      <div className={cx("eod")} ref={eod} data-idx={"eod"}></div>
    </div>
  );
}

export async function getStaticPaths() {
  const sanityService = new SanityService();
  const posts = await sanityService.getData({
    type: "post",
    category: null,
    subCategory: null,
  });
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
  const category = await sanityService.getCategory();
  const profile = await sanityService.getProfile();
  ///const posts = await sanityService.getPost();
  const recentPost = await sanityService.getData({
    type: "post",
    category: null,
    subCategory: null,
  });
  const post = await sanityService.getDataBySlug({ slug });
  const subCategory = await sanityService.getSubCategory(post.category.type);
  return {
    props: {
      slug,
      post,
      profile,
      recentPost,
      category,
      subCategory,
      pageType: post.category.type,
    },
  };
}
