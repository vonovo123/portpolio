import Router from "next/router";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
export default function Header({
  menuState,
  viewState,
  subMenuState,
  subViewState,
  profile,
  width,
  menus,
}) {
  return (
    <>
      {/* {width >= 767 && ( */}
      <Desktop
        title={"개발블로그"}
        menuState={menuState}
        viewState={viewState}
        subMenuState={subMenuState}
        subViewState={subViewState}
        profile={profile}
        menus={menus}
      ></Desktop>
      {/* )} */}
      {/* {width < 767 && (
        <Mobile
          view={view}
          setTarget={setTarget}
          title={title}
          menus={menus}
          profile={profile}
        ></Mobile>
      )} */}
    </>
  );
}
