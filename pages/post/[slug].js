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
  content,
  subMenuState,
  setHideAbout,
  goPage,
  setMobileHeaderHide,
}) {
  const [subMenu, setSubMenu] = subMenuState;
  const [readKey, setReadkey] = useState({ flag: false });
  const sod = useRef(null);
  const eod = useRef(null);
  const [heading, setHeading] = useState([]);
  const [foldToc, setFoldToc] = useState(true);
  useEffect(() => {
    setMobileHeaderHide(true);
    setHideAbout(true);
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
  }, [content]);
  useEffect(() => {
    if (!subMenu) return;
    goPage();
  }, [subMenu]);
  const makeReview = async () => {
    const sanityService = new SanityService();
    await sanityService.setReview({ id: content._id });
  };
  const deleteReview = async () => {
    const sanityService = new SanityService();
    await sanityService.deleteReview({ id: content._id });
  };
  return (
    content && (
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
        {/* <div>
        <button onClick={makeReview}>make</button>
      </div>
      <div>
        <button onClick={deleteReview}>delete</button>
      </div> */}
        <div className={cx("contentHeaderWrapper")} ref={sod} data-idx={"sod"}>
          <div className={cx("postImageWrapper")}>
            <Image
              src={content.thumbnail.imageUrl}
              alt={content.thumbnail.alt}
              className={cx("postImage")}
              preview={false}
            />
          </div>
          <div className={cx("contentHeaderInfo")}>
            <div className={cx("title", "mb20")}>{content.title}</div>
            <div className={cx("subTitle", "mb20")}>{content.subtitle}</div>
            <div className={cx("createdAt", "mb10")}>
              {dayjs(content.createdAt).format("MMMM DD / YYYY ")}
            </div>
            <div className={cx("contentAuthor")}>
              <Image
                src={content.author.image}
                alt={content.author.name}
                className={cx("authorImage")}
                preview={false}
              />
              <div className={cx("authorNameWrapper")}>
                <div className={cx("authorName")}>{content.author.name}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("contentBody")}>
          <BlogMarkDown markdown={content.postContent.markdown} />
        </div>
        <div className={cx("eod")} ref={eod} data-idx={"eod"}></div>
      </div>
    )
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const sanityService = new SanityService();
  const category = await sanityService.getCategory();
  const profile = await sanityService.getProfile();
  const recentPost = await sanityService.getData({
    type: "post",
    category: null,
    subCategory: null,
  });
  const content = await sanityService.getDataBySlug({ slug });
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
      popularPost,
      category,
      subCategory,
      pageType: content.category.type,
    },
  };
}
