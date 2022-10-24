import SanityService from "../../services/SanityService";
import styles from "../../styles/Slug.module.css";
import BlogMarkDown from "../../components/BlogMarkDown";
import { useState, useEffect, useRef, useCallback } from "react";
import { Col, Image, Row } from "antd";
import dayjs from "dayjs";
import classNames from "classnames/bind";
import { makeHeadings } from "../../utils/Headings";
import makeObserver from "../../utils/Observer";
import TableOfContents from "../../components/TableOfContents";
import { CaretLeftOutlined } from "@ant-design/icons";
import CommentInput from "../../components/Comment/CommentInput";
import CommentList from "../../components/Comment/CommentList";
const cx = classNames.bind(styles);
export default function Post({
  content,
  menuTypeState,
  pageViewState,
  subMenuState,
  cachedPathState,
  postTitleState,
  goPage,
  setMobileHeaderHide,
}) {
  const [menuType, setMenuType] = menuTypeState;
  const [pageView, setPageView] = pageViewState;
  const [subMenu, setSubMenu] = subMenuState;
  const [cachedPath, setCachedPath] = cachedPathState;
  const [postTitle, setPostTitle] = postTitleState;
  const [readKey, setReadkey] = useState({ flag: false });
  const sod = useRef(null);
  const eod = useRef(null);
  const [heading, setHeading] = useState([]);
  const [foldToc, setFoldToc] = useState(true);
  const commentListState = useState([]);
  const [commentList, setCommentList] = commentListState;
  const loadComments = useCallback(async () => {
    const sanityService = new SanityService();
    const result = await sanityService.getCommentsById({ id: content._id });
    console.log(result);
    setCommentList([...result]);
  }, [content._id]);

  useEffect(() => {
    setPageView("slug");
    setMobileHeaderHide(true);
  }, []);

  useEffect(() => {
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
    const page = content.category.type;
    const path = {
      menu: content.category.slug,
      subMenu: null,
    };
    const main = content.category.name;
    const sub = content.subCategory.name;
    const title = content.title;
    const newTitle = { main, sub, title };
    setPostTitle(newTitle);
    setMenuType(page);
    setCachedPath({
      page,
      ...path,
    });
    loadComments();
    window.scrollTo({
      top: sod.current.offsetTop - 120,
      behavior: "smooth",
    });
  }, [content]);
  useEffect(() => {
    if (!subMenu) {
      return;
    }
    goPage();
  }, [subMenu]);

  return (
    <div className={cx("postWrapper")}>
      {content && (
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
          <div
            className={cx("contentHeaderWrapper")}
            ref={sod}
            data-idx={"sod"}
          >
            <div className={cx("postImageWrapper")}>
              <Image
                src={content.thumbnail.imageUrl}
                alt={content.thumbnail.alt}
                className={cx("postImage")}
                preview={false}
              />
            </div>
            <div className={cx("contentHeaderInfo")}>
              <div className={cx("mb30")}>
                <div className={cx("title", "mb20")}>{content.title}</div>
                <div className={cx("subTitle", "mb20")}>{content.subtitle}</div>
              </div>
              <div className={cx("contentAuthor")}>
                <div className={cx("authorInfo")}>
                  <Image
                    src={content.author.image}
                    alt={content.author.name}
                    className={cx("authorImage")}
                    preview={false}
                  />
                  <div className={cx("editInfo")}>
                    <div className={cx("createdAt")}>
                      {dayjs(content.createdAt).format("MMMM DD / YYYY ")}
                    </div>
                    <div
                      className={cx("authorName")}
                    >{`posted by ${content.author.name}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("contentBody")}>
            <BlogMarkDown markdown={content.postContent.markdown} />
          </div>
          <div className={cx("eod")} ref={eod} data-idx={"eod"}></div>
        </div>
      )}
      <div className={cx("comment")}>
        <div className={cx("commentTitle")}>댓글</div>
        <CommentInput
          postInfo={{
            id: content._id,
            slug: content.slug,
            title: content.title,
          }}
          loadComments={loadComments}
        ></CommentInput>
        <CommentList commentListState={commentListState}></CommentList>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const sanityService = new SanityService();
  const category = await sanityService.getCategory();
  const profile = await sanityService.getProfile();
  const content = await sanityService.getDataBySlug({ slug });
  const recentPost = await sanityService.getData({
    type: "post",
    category: null,
    subCategory: null,
  });
  const categoryPost = await sanityService.getData({
    type: "post",
    category: content.category.slug,
    subCategory: content.subCategory.type,
  });

  const subCategory = await sanityService.getSubCategory(content.category.type);
  const popularPost = await sanityService.getData({
    type: "popular",
    category: null,
    subCategory: null,
  });
  sanityService.upCount({ id: content._id });
  return {
    props: {
      slug,
      content,
      profile,
      recentPost,
      categoryPost,
      popularPost,
      category,
      subCategory,
      pageType: content.category.type,
    },
  };
}
