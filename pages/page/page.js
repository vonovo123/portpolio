import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/Page/Page.module.css";
import PostListElement from "../../components/Element/PostListElement";
import PortpolioListElement from "../../components/Element/PortpolioListElement";
import CareerListElement from "../../components/Element/CareerListElement";
import { LoadingOutlined } from "@ant-design/icons";
import List from "../../components/List";
const cx = classNames.bind(styles);
export default function Page({ goSlug, post, loading, pageView }) {
  const pageRef = useRef();
  const listRef = useRef();
  const createElement = useCallback(
    ({ element, idx }) => {
      if (pageView === "post")
        return <PostListElement element={element} key={idx} goSlug={goSlug} />;
      if (pageView === "portpolio")
        return <PortpolioListElement element={element} key={idx} />;
      if (pageView === "career") {
        return <CareerListElement element={element} key={idx} />;
      }
    },
    [pageView]
  );
  useEffect(() => {
    if (loading === null) return;
    if (!loading) {
      pageRef.current.style.transform = `translate3d(0, -50px, 0)`;
      listRef.current.style.opacity = 1;
    } else {
      pageRef.current.style.transform = `translate3d(0, 0px, 0)`;
    }
  }, [loading]);

  return (
    <div className={cx("page")}>
      <div className={cx("pageWrapper")} ref={pageRef}>
        <div className={cx("loading")}>
          <LoadingOutlined />
        </div>

        <div ref={listRef} className={cx("listWrapper")}>
          {!loading && (
            <List dataList={post} createElement={createElement}></List>
          )}
        </div>
      </div>
    </div>
  );
}
