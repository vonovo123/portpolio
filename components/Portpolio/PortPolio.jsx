import styles from "../../styles/Portpolio/Portpolio.module.css";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import PortPolioElement from "./PortPolioElement";
import Carousel from "../Carousel/Carousel";

const cx = classNames.bind(styles);

export default function Portpolio({
  portpolios,
  windowWidth,
  contentWidth,
  menu,
  headerFold,
}) {
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
      case "pub":
        setTarget([...html]);
        break;
      case "js":
        setTarget([...vanillaJs]);
        break;
      case "vue":
        setTarget([...vueNuxt]);
        break;
      case "react":
        setTarget([...reactNext]);
        break;
      default:
        setTarget([...html, ...vanillaJs, ...vueNuxt, ...reactNext]);
        break;
    }
  }, [menu]);
  return (
    <div className={cx("portpolio")}>
      <Carousel
        slideData={target}
        makeElement={makeElement}
        windowWidth={windowWidth}
        contentWidth={contentWidth}
        headerFold={headerFold}
      ></Carousel>
    </div>
  );
}
