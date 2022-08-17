import { Col, Row } from "antd";
import styles from "../styles/Title.module.css";
import classNames from "classnames/bind";
import Menus from "./Menus";
const cx = classNames.bind(styles);
export default function Title({
  titleMenus,
  viewState,
  subViewState,
  typeState,
  subTitleState,
}) {
  const [view, setView] = viewState;
  const [subView, setSubView] = subViewState;
  const [type, setType] = typeState;
  const [subTitle, setSubTitle] = subTitleState;
  return (
    <Row className={cx("titleWrapper")}>
      <Col className={cx("titleText")} span={24}>
        <Row>
          {titleMenus[type] && titleMenus[type][view] && (
            <Col>{titleMenus[type][view]}</Col>
          )}
          {titleMenus[type] && titleMenus[type][subView] && (
            <Col>{titleMenus[type][subView]}</Col>
          )}
          {subTitle && subTitle}
        </Row>
      </Col>
    </Row>
  );
}
