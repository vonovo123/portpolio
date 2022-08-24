import Router from "next/router";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
export default function Menu({
  menuState,
  viewState,
  subMenuState,
  subViewState,
  profile,
  menus,
  typeState,
}) {
  return (
    <>
      <Desktop
        menuState={menuState}
        viewState={viewState}
        subMenuState={subMenuState}
        subViewState={subViewState}
        profile={profile}
        menus={menus}
        typeState={typeState}
      ></Desktop>
    </>
  );
}
