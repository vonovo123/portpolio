import dayjs from "dayjs";
import classNames from "classnames/bind";
import List from "./List";
import styles from "../styles/Side.module.css";
import { useCallback } from "react";
import { Image } from "antd";
const cx = classNames.bind(styles);
export default function Side({
  pageView,
  categoryPost,
  popularPost,
  recentComment,
  goSlug,
}) {
  const createPostElement = useCallback(({ element, idx }) => {
    return (
      element && (
        <div
          className={cx("content")}
          key={idx}
          onClick={() => {
            goSlug({ slug: element.slug });
          }}
        >
          <div className={cx("contentWrapper")}>
            <div className={cx("imageWrapper")}>
              <Image
                src={element.thumbnail.imageUrl}
                alt={element.thumbnail.alt}
                className={cx("image")}
                preview={false}
              />
            </div>
            <div className={cx("cotentInnerWrapper")}>
              <div className={cx("postTxt")}>
                {`${element.category.name} / ${element.subCategory.type} / ${element.title}`}
              </div>
              <div className={cx("subTitle")}>{element.subtitle}</div>
              <div className={cx("contentDate")}>
                {dayjs(element.createdAt).format("MMMM DD HH:mm:ss")}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }, []);
  const createCommentElement = useCallback(({ element, idx }) => {
    return (
      element && (
        <div
          className={cx("content")}
          onClick={() => {
            goSlug({ slug: element.postSlug });
          }}
        >
          <div className={cx("contentWrapper")}>
            <div className={cx("contentDate")}>
              {dayjs(element.createdAt).format("MMMM DD HH:mm:ss")}
            </div>
          </div>
          <div className={cx("contentWrapper")}>
            <div className={cx("imageWrapper")}>
              <Image
                className={cx("image")}
                src={`https://placedog.net/100/100/?id=${idx + 1}`}
                alt={"randomDog"}
                preview={false}
              />
            </div>
            <div className={cx("cotentInnerWrapper")}>
              <div className={cx("contentName")}>
                {JSON.parse(element.nickName)}
              </div>
              <div className={cx("contentTxt")}>
                {JSON.parse(element.comment)}
              </div>
              <div
                className={cx("postTitle")}
              >{`from ${element.postTitle}`}</div>
            </div>
          </div>
        </div>
      )
    );
  }, []);
  return (
    <>
      {/* <AdSide></AdSide> */}
      {pageView === "slug" && (
        <div className={cx("mb50")}>
          <List
            dataList={categoryPost}
            title={"카테고리의 다른 글"}
            goSlug={goSlug}
            createElement={createPostElement}
          ></List>
        </div>
      )}
      {pageView === "post" && (
        <>
          <div className={cx("mb50")}>
            <List
              dataList={popularPost}
              title={"사람들이 많이 본 글"}
              goSlug={goSlug}
              createElement={createPostElement}
            ></List>
          </div>
          <div className={cx("mb50")}>
            <List
              dataList={recentComment}
              title={"최근 댓글"}
              goSlug={goSlug}
              createElement={createCommentElement}
            ></List>
          </div>
        </>
      )}
    </>
  );
}
