import Router from "next/router";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
export default function Header({
  view,
  navClickEvent,
  type,
  title = "개발자 블로그",
  width,
  profile,
  menus,
}) {
  const goBack = () => {
    Router.back();
  };
  return (
    <>
      {width >= 767 && (
        <Desktop
          view={view}
          goBack={goBack}
          navClickEvent={navClickEvent}
          type={type}
          title={title}
          menus={menus}
          profile={profile}
        ></Desktop>
      )}
      {width < 767 && (
        <Mobile
          view={view}
          goBack={goBack}
          navClickEvent={navClickEvent}
          type={type}
          title={title}
          menus={menus}
          profile={profile}
        ></Mobile>
      )}
    </>
  );
}
