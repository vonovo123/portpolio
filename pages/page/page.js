import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/Page/Page.module.css";
const cx = classNames.bind(styles);
import List from "../../components/List";
import { LoadingOutlined } from "@ant-design/icons";
export default function Page({ goPage, post, loading, makeElement }) {
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
          <List goPage={goPage} list={post} makeElement={makeElement}></List>
        </div>
      </div>
    </div>
  );
}
