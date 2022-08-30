import styles from "../../styles/Portpolio/Portpolio.module.css";
import classNames from "classnames/bind";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PortPolioElement from "./PortPolioElement";
import Slide from "../Slide/Slide";
import makeObserver from "../../utils/Observer";

const cx = classNames.bind(styles);

export default function Portpolio({
  portpolios,
  windowWidth,
  contentWidth,
  subViewState,
  subMenuState,
  makeSubTitle,
}) {
  const [subView, setSubView] = subViewState;
  const [subMenu, setSubMenu] = subMenuState;
  const [loadState, setLoadState] = useState({
    pub: false,
    js: false,
    vue: false,
    react: false,
  });
  const refObj = {
    pub: useRef(null),
    js: useRef(null),
    vue: useRef(null),
    react: useRef(null),
  };
  const dataObj = {
    pub: { name: "퍼블리싱", value: [] },
    js: { name: "자바스크립트", value: [] },
    vue: { name: "뷰", value: [] },
    react: { name: "리엑트", value: [] },
  };
  portpolios.forEach((portpolio) => {
    if (portpolio.category.type === "html/css") {
      dataObj.pub.value.push({ ...portpolio });
    } else if (portpolio.category.type === "vanillaJs") {
      dataObj.js.value.push({ ...portpolio });
    } else if (portpolio.category.type === "vueNuxt") {
      dataObj.vue.value.push({ ...portpolio });
    } else if (portpolio.category.type === "reactNext") {
      dataObj.react.value.push({ ...portpolio });
    }
  });

  const makeElement = (element) => {
    return <PortPolioElement element={element}></PortPolioElement>;
  };

  useEffect(() => {
    makeObserver(
      {
        rootMargin: "-70% 0% -30% 0%",
      },
      refObj,
      (entry) => {
        const menu = entry.target.dataset.idx;
        setSubView(menu);
      }
    );
  }, []);
  //하위메뉴 변경
  useEffect(() => {
    if (!subMenu) return;
    const { id } = subMenu;
    setSubView(id);
    window.scrollTo({
      top: refObj[id].current.offsetTop - 50,
      behavior: "smooth",
    });
  }, [subMenu]);
  useEffect(() => {
    const newLoadState = { ...loadState };
    newLoadState[subView] = true;
    setLoadState({ ...newLoadState });
  }, [subView]);
  return (
    <>
      {Object.entries(dataObj).map(([key, data], idx) => (
        <div
          className={cx("portpolioWrapper", { typeA: idx % 2 === 1 })}
          ref={refObj[key]}
          key={idx}
          data-idx={key}
        >
          <div className={cx("portpolio", "animate", { load: loadState[key] })}>
            {makeSubTitle("portpolio", key)}
            <div className={cx("carouselWrapper")}>
              <Slide
                data={data.value}
                makeElement={makeElement}
                windowWidth={windowWidth}
                contentWidth={contentWidth}
              ></Slide>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
