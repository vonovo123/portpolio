import Router from "next/router";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
export default function Header({
  menuState,
  viewState,
  subMenuState,
  subViewState,
  profile,
  menus,
}) {
  return (
    <>
      <Desktop
        title={"개발블로그"}
        menuState={menuState}
        viewState={viewState}
        subMenuState={subMenuState}
        subViewState={subViewState}
        profile={profile}
        menus={menus}
      ></Desktop>
    </>
  );
}
