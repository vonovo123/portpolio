import styles from "../../styles/Portpolio/Portpolio.module.css";
import classNames from "classnames/bind";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PortPolioElement from "./PortPolioElement";
import Carousel from "../Carousel/Carousel";
import BreadCrumb from "../BreadCrumb";
import makeObserver from "../../utils/Observer";

const cx = classNames.bind(styles);

export default function Portpolio({
  portpolios,
  windowWidth,
  contentWidth,
  subMenuState,
  headerFold,
  makeSubTitle,
}) {
  const [subMenu, setSubMenu] = subMenuState;
  const portArr = {
    pub: { name: "퍼블리싱", value: [], ref: useRef(null) },
    js: { name: "자바스크립트", value: [], ref: useRef(null) },
    vue: { name: "뷰", value: [], ref: useRef(null) },
    react: { name: "리엑트", value: [], ref: useRef(null) },
  };
  portpolios.forEach((portpolio) => {
    if (portpolio.category.type === "html/css") {
      portArr.pub.value.push({ ...portpolio });
    } else if (portpolio.category.type === "vanillaJs") {
      portArr.js.value.push({ ...portpolio });
    } else if (portpolio.category.type === "vueNuxt") {
      portArr.vue.value.push({ ...portpolio });
    } else if (portpolio.category.type === "reactNext") {
      portArr.react.value.push({ ...portpolio });
    }
  });

  const makeElement = (element) => {
    return <PortPolioElement element={element}></PortPolioElement>;
  };

  useEffect(() => {
    const option = {
      rootMargin: "-20% 0% -80% 0%",
    };
    const interSectionCallback = (entry) => {
      const menu = entry.target.dataset.idx;
      setSubMenu(menu);
      //setView(menu);
    };
    const ref = {};
    Object.entries(portArr).map(([key, port], idx) => {
      ref[port.name] = port.ref;
    });
    const io = makeObserver(option, ref, interSectionCallback);
  }, []);
  return (
    <div className={cx("portpolioWrapper")}>
      {Object.entries(portArr).map(([key, port], idx) => (
        <div
          className={cx("portpolio")}
          key={idx}
          ref={port.ref}
          data-idx={key}
        >
          {/* <BreadCrumb params={["포트폴리오", port.name]}></BreadCrumb> */}
          {makeSubTitle(key)}
          <Carousel
            data={port.value}
            makeElement={makeElement}
            windowWidth={windowWidth}
            contentWidth={contentWidth}
            headerFold={headerFold}
          ></Carousel>
        </div>
      ))}
    </div>
  );
}
