import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/Page/Page.module.css";
const cx = classNames.bind(styles);
import List from "../../components/List";
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
  const listRef = useRef();

  //화면진입 //스크롤로 화면변경
  useEffect(() => {
    setPage(initPage);
    setMenu(initMenu);
    setMenuInfo(initMenuInfo);
  }, []);
  useEffect(() => {
    if (!menu) return;
    listRef.current.style.opacity = 0;
    listRef.current.style.transform = `translate3d(0,50px, 0)`;
    setTimeout(() => {
      if (page === "home" || page === "career") {
        setPostList([...post]);
      } else {
        setPostList([...post.filter((post) => post.category.type === menu)]);
      }
      listRef.current.style.opacity = 1;
      listRef.current.style.transform = `translate3d(0, 0px, 0)`;
    }, 1000);
  }, [menu]);

  return (
    <div className={cx("componentWrapper")} ref={listRef}>
      <List goPage={goPage} list={postList} makeElement={makeElement}></List>
    </div>
  );
}
