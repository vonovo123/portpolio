import { Col, Row } from "antd";
import { useRouter } from "next/router";
import { CaretRightOutlined, RightOutlined } from "@ant-design/icons";
import styles from "../styles/Title.module.css";
import classNames from "classnames/bind";
import { useCallback, useState } from "react";
import Menus from "./Menus";
const cx = classNames.bind(styles);
export default function Title({
  view,
  type,
  show = true,
  menus,
  setMenu,
  menu,
}) {
  const router = useRouter();
  const goList = useCallback(() => {
    router.push(`/posts`);
  }, [router]);

  const portPolioMenus = ["ALL", "HTML / CSS", "Vanilla JS", "Vue", "React"];

  return (
    <Row className={cx("titleWrapper", { hide: !show })}>
      <Col className={cx("titleText", { sel: view === type })} span={24}>
        <Row>
          <Col>{menus[view]}</Col>
          {view === "post" && (
            <Col className={cx("moveText")} onClick={goList}>
              {"전체보기"} <RightOutlined />
            </Col>
          )}
          {view === "portpolio" && (
            <Menus menus={portPolioMenus} setMenu={setMenu} menu={menu}></Menus>
          )}
        </Row>
      </Col>
    </Row>
  );
}
