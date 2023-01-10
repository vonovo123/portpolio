import styles from "../styles/TOC.module.css";
import classNames from "classnames/bind";
import { CaretRightOutlined } from "@ant-design/icons";
import { useCallback } from "react";
const cx = classNames.bind(styles);
export default function TableOfContents({
  outline,
  readKey,
  setFoldToc,
  sod,
  eod,
}) {
  const getChildrenText = (heading) => {
    return heading.el.innerText;
  };
  const headClickEvent = useCallback((el) => {
    window.scrollTo({
      top: el.offsetTop - 50,
      behavior: "smooth",
    });
  }, []);
  const createOrderedList = (outline) => {
    return (
      <ol className={cx("orderedList")}>
        {outline.map((heading, idx) => (
          <li
            key={heading.el._key}
            className={cx("list", `lv${heading.level}`, {
              read: readKey === heading.el._key,
            })}
            id={heading.el._key}
          >
            <div
              className={cx("listTxt")}
              onClick={() => {
                headClickEvent(heading.el);
              }}
            >
              {getChildrenText(heading)}
            </div>
            {heading.subheadings.length > 0 &&
              createOrderedList(heading.subheadings)}
          </li>
        ))}
      </ol>
    );
  };
  return (
    <>
      <div className={cx("toc")}>
        <div
          className={cx("tocTitle")}
          onClick={() => {
            setFoldToc(true);
          }}
        >
          <div className={cx("btn")}>
            <CaretRightOutlined />
          </div>
          <div className={cx("text")}>Table of Content</div>
        </div>
        <div className={cx("tocContent")}>
          <div
            className={cx("list", `lv$1`, {
              read: readKey === "sod",
            })}
          >
            <div
              className={cx("listTxt")}
              onClick={() => {
                headClickEvent(sod.current);
              }}
            >
              Title
            </div>
          </div>
          <div className={cx("listTxt")}>Content</div>
          {createOrderedList(outline)}
          <div
            className={cx("list", `lv$1`, {
              read: readKey === "eod",
            })}
          >
            <div
              className={cx("listTxt")}
              onClick={() => {
                headClickEvent(eod.current);
              }}
            >
              Comments
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
