import styles from "../styles/TOC.module.css";
import classNames from "classnames/bind";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import { useCallback } from "react";
const cx = classNames.bind(styles);
export default function TableOfContents({
  outline,
  openToc,
  setOpenToc,
  readKey,
}) {
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
                  top: heading.el.offsetTop - 80,
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
    <div className={cx("tocWrapper", { open: openToc })}>
      <div className={cx("tocTitleWrapper")}>
        <div className={cx("tocArrowBtn")} onClick={changeTocState}>
          {openToc && <CaretRightOutlined />}
          {!openToc && <CaretLeftOutlined />}
        </div>
      </div>
      <div className={cx("tocContentWrapper")}>
        <div className={cx("tocTitle")}>Table Of Contents</div>
        {createOrderedList(outline)}
      </div>
    </div>
  );
}
