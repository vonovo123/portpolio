import styles from "../styles/TOC.module.css";
import classNames from "classnames/bind";
import { CaretRightOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function TableOfContents({ outline, readKey, setFoldToc }) {
  const getChildrenText = (heading) => {
    return heading.el.innerText;
  };
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
              className={cx({})}
              onClick={() => {
                window.scrollTo({
                  top: heading.el.offsetTop - 30,
                  behavior: "smooth",
                });
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
            <div>Start of Content</div>
          </div>
          {createOrderedList(outline)}
          <div
            className={cx("list", `lv$1`, {
              read: readKey === "eod",
            })}
          >
            <div>End of Content</div>
          </div>
        </div>
      </div>
    </>
  );
}
