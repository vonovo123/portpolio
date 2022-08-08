import Router from "next/router";
import Mobile from "./Mobile";
import DeskTop from "./DeskTop";
export default function Header({
  view,
  navClickEvent,
  type,
  title = "Web Frontend Development Log",
  width,
}) {
  const menus = ["post", "portpolio", "about"];
  const goBack = () => {
    Router.back();
  };
  return (
    <>
      {width >= 767 && (
        <DeskTop
          view={view}
          goBack={goBack}
          navClickEvent={navClickEvent}
          type={type}
          title={title}
          menus={menus}
        ></DeskTop>
      )}
      {width < 767 && (
        <Mobile
          view={view}
          goBack={goBack}
          navClickEvent={navClickEvent}
          type={type}
          title={title}
          menus={menus}
        ></Mobile>
      )}
    </>
  );
}
