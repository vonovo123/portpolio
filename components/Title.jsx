import { Col, Row } from "antd";
import styles from "../styles/Title.module.css";
import classNames from "classnames/bind";
import Menus from "./Menus";
const cx = classNames.bind(styles);
export default function Title({
  mainTitleState,
  subTitleState,
  menuFold,
  setMenuFold,
}) {
  const [mainTitle, mainSubTitle] = mainTitleState;
  const [subTitle, setSubTitle] = subTitleState;
  return (
    <Row className={cx("titleWrapper")}>
      {/* <div
        className={cx("mainTitleArrow")}
        onClick={() => {
          setMenuFold(!menuFold);
        }}
      >
        {">"}
      </div> */}
      {mainTitle && mainTitle}
    </Row>
  );
}
