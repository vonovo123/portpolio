import styles from "../../styles/Portpolio/Portpolio.module.css";
import classNames from "classnames/bind";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PortPolioElement from "./PortPolioElement";
import Carousel from "../Carousel/Carousel";
import makeObserver from "../../utils/Observer";

const cx = classNames.bind(styles);

export default function Portpolio({
  portpolios,
  windowWidth,
  contentWidth,
  subViewState,
  subMenuState,
  headerFold,
  makeSubTitle,
}) {
  const [subView, setSubView] = subViewState;
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
      rootMargin: "-50% 0% -50% 0%",
    };
    const interSectionCallback = (entry) => {
      const menu = entry.target.dataset.idx;
      setSubView(menu);
    };
    const ref = {};
    Object.entries(portArr).map(([key, port], idx) => {
      ref[port.name] = port.ref;
    });
    const io = makeObserver(option, ref, interSectionCallback);
  }, []);
  //하위메뉴 변경
  useEffect(() => {
    if (!subMenu) return;
    const { id } = subMenu;
    if (!id) return;
    window.scrollTo({
      top: portArr[id].ref.current.offsetTop,
      behavior: "smooth",
    });
    setSubView(id);
  }, [subMenu]);
  return (
    <div className={cx("portpolioWrapper")}>
      {Object.entries(portArr).map(([key, port], idx) => (
        <div
          className={cx("portpolio", { typeA: idx % 2 === 1 })}
          key={idx}
          ref={port.ref}
          data-idx={key}
        >
          {makeSubTitle("portpolio", key)}
          <div className={cx("carouselWrapper")}>
            <Carousel
              data={port.value}
              makeElement={makeElement}
              windowWidth={windowWidth}
              contentWidth={contentWidth}
              headerFold={headerFold}
            ></Carousel>
          </div>
        </div>
      ))}
    </div>
  );
}
