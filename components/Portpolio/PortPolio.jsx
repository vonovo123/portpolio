import styles from "../../styles/Portpolio/Portpolio.module.css";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import PortPolioElement from "./PortPolioElement";
import Carousel from "../Carousel/Carousel";

const cx = classNames.bind(styles);

export default function Portpolio({ portpolios, view, width, menu }) {
  let html = [],
    vanillaJs = [],
    vueNuxt = [],
    reactNext = [];
  portpolios.forEach((portpolio) => {
    if (portpolio.category.type === "html/css") {
      html.push({ ...portpolio });
    } else if (portpolio.category.type === "vanillaJs") {
      vanillaJs.push({ ...portpolio });
    } else if (portpolio.category.type === "vueNuxt") {
      vueNuxt.push({ ...portpolio });
    } else if (portpolio.category.type === "reactNext") {
      reactNext.push({ ...portpolio });
    }
  });
  const [target, setTarget] = useState([
    ...html,
    ...vanillaJs,
    ...vueNuxt,
    ...reactNext,
  ]);
  const makeElement = (element) => {
    return <PortPolioElement element={element}></PortPolioElement>;
  };

  useEffect(() => {
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
  }, [menu]);
  return (
    <div className={cx("portpolio", { sel: view === "portpolio" })}>
      <Carousel
        slideData={target}
        makeElement={makeElement}
        windowWidth={width}
      ></Carousel>
    </div>
  );
}
