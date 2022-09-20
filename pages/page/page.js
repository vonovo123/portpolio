import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/Page/Page.module.css";
const cx = classNames.bind(styles);
import List from "../../components/List";
import { LoadingOutlined } from "@ant-design/icons";
export default function Page({
  goPage,
  post,
  pageState,
  menuState,
  menuInfoState,
  initPage,
  initMenu,
  initMenuInfo,
  postListState,
  makeElement,
}) {
  const [page, setPage] = pageState;
  const [menu, setMenu] = menuState;
  const [menuInfo, setMenuInfo] = menuInfoState;
  const [postList, setPostList] = postListState;
  const loadingState = useState(false);
  const [loading, setLoading] = loadingState;
  const pageRef = useRef();
  const loadingRef = useRef();
  //화면진입 //스크롤로 화면변경
  useEffect(() => {
    setPage(initPage);
    setMenuInfo(initMenuInfo);
    setMenu(initMenu);
  }, []);
  useEffect(() => {
    pageRef.current.style.opacity = 0;
    pageRef.current.style.transform = `translate3d(0,50px, 0)`;
    if (!menu) {
      setPostList(null);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      let newPostList = null;
      if (page === "home" || page === "career") {
        newPostList = [...post];
      } else {
        newPostList = [...post.filter((post) => post.category.type === menu)];
      }
      setPostList(newPostList);
      pageRef.current.style.opacity = 1;
      pageRef.current.style.transform = `translate3d(0, 0px, 0)`;
      setLoading(false);
    }, 1000);
  }, [menu]);
  useEffect(() => {
    if (!loading) {
      loadingRef.current.style.transform = `translate3d(0, -100px, 0)`;
    } else {
      loadingRef.current.style.transform = `translate3d(0, 0px, 0)`;
    }
  }, [loading]);
  return (
    <>
      <div className={cx("loading")} ref={loadingRef}>
        <LoadingOutlined />
      </div>
      <div className={cx("page")} ref={pageRef}>
        <List goPage={goPage} list={postList} makeElement={makeElement}></List>
      </div>
    </>
  );
}
