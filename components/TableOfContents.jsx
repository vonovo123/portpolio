import styles from "../styles/TOC.module.css";
import classNames from "classnames/bind";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";
const cx = classNames.bind(styles);
export default function TableOfContents({
  outline,
  openToc,
  setOpenToc,
  readKey,
  fixed,
}) {
  const titleRef = useRef(null);
  const swing = useRef(null);
  useEffect(() => {
    let flag = true;
    if (!openToc) {
      //if (swing.current) return;
      swing.current = setInterval(() => {
        if (flag) {
          titleRef.current.style.transform = `translate3d(${15}px, 0, 0)`;
        } else {
          titleRef.current.style.transform = `translate3d(${0}px, 0, 0)`;
        }
        flag = !flag;
      }, 1000);
    } else {
      titleRef.current.style.transform = `translate3d(${0}px, 0, 0)`;
      clearInterval(swing.current);
      swing.current = null;
    }
    return () => {
      clearInterval(swing.current);
    };
  }, [openToc]);
  const getChildrenText = (heading) => {
    return heading.el.innerText;
  };
  const changeTocState = useCallback(() => {
    setOpenToc(!openToc);
  });
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
                  top: heading.el.offsetTop - 130,
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
    <div className={cx("toc")}>
      <div
        className={cx("tocMoveTitle", { open: openToc, fixed: fixed })}
        ref={titleRef}
        onClick={changeTocState}
      >
        <div className={cx("tocTitle")}>
          <CaretLeftOutlined /> TOC
        </div>
      </div>

      <div className={cx("tocWrapper", { open: openToc, fixed: fixed })}>
        <div
          className={cx("tocTitleWrapper", { open: openToc, fixed: fixed })}
          onClick={changeTocState}
        >
          <div className={cx("tocTitle")}>
            <CaretRightOutlined style={{ paddingRight: 20 }} />
            Table Of Contents
          </div>
        </div>

        <div className={cx("tocContentWrapper")}>
          {createOrderedList(outline)}
        </div>
      </div>
    </div>
  );
}