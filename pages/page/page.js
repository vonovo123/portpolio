import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/Page/Page.module.css";
import CodingListElement from "../../components/Element/PostListElement";
import PortpolioListElement from "../../components/Element/PortpolioListElement";
import CareerListElement from "../../components/Element/CareerListElement";
import { LoadingOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function Page({ goPage, post, loading, pageView }) {
  const pageRef = useRef();
  useEffect(() => {
    if (!loading) {
      pageRef.current.style.transform = `translate3d(0, -70px, 0)`;
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
        <div className={cx("list")}>
          <div className={cx("listWrapper")}>
            {!loading && post && post.length === 0 && (
              <div>{"표시할 내용이 없습니다."}</div>
            )}
            {!loading &&
              post &&
              post.length > 0 &&
              post.map((element, idx) => {
                if (pageView === "post")
                  return (
                    <CodingListElement
                      element={element}
                      key={idx}
                      goPage={goPage}
                    />
                  );
                if (pageView === "portpolio")
                  return <PortpolioListElement element={element} key={idx} />;
                if (pageView === "career") {
                  return <CareerListElement element={element} key={idx} />;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
