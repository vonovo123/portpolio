import { Col, Image, Row } from "antd";
import styles from "../../styles/Portpolio/Portpolio.module.css";
import classNames from "classnames/bind";
import BlogPostDetail from "../BlogPostDetail";
import { useEffect, useState } from "react";
import Title from "../Title";
import PortPolioElement from "./PortPolioElement";
import Carousel from "../Carousel/Carousel";
import Menus from "../Menus";
const cx = classNames.bind(styles);

export default function Portpolio({
  html,
  vanillaJs,
  vueNuxt,
  reactNext,
  view,
  width,
}) {
  const [target, setTarget] = useState([
    ...html,
    ...vanillaJs,
    ...vueNuxt,
    ...reactNext,
  ]);
  const makeElement = (element) => {
    return <PortPolioElement element={element}></PortPolioElement>;
  };
  const changeMenu = (menu) => {
    switch (menu) {
      case "HTML / CSS":
        setTarget([...html]);
        break;
      case "Vanilla JS":
        setTarget([...vanillaJs]);
        break;
      case "Vue":
        setTarget([...vueNuxt]);
        break;
      case "React":
        setTarget([...reactNext]);
        break;
      default:
        setTarget([...html, ...vanillaJs, ...vueNuxt, ...reactNext]);
        break;
    }
  };

  const menus = ["ALL", "HTML / CSS", "Vanilla JS", "Vue", "React"];
  const [showMenuList, setShowMenuList] = useState(false);
  const [menu, setMenu] = useState("ALL");

  return (
    <div className={cx("portpolio", { sel: view === "portpolio" })}>
      <Row className={cx("header")}>
        <Title
          view={view}
          type={"portpolio"}
          title={"포트폴리오"}
          show={true}
        ></Title>
        <Menus
          menus={menus}
          setMenu={setMenu}
          menu={menu}
          showMenuList={showMenuList}
          setShowMenuList={setShowMenuList}
          changeMenu={changeMenu}
        ></Menus>
      </Row>
      <Carousel
        slideData={target}
        makeElement={makeElement}
        windowWidth={width}
      ></Carousel>
    </div>
  );
}
