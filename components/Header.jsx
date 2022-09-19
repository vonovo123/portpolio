import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
import { ArrowLeftOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);
export default function Header({ goPage, pageState }) {
  const [page, setPage] = pageState;
  return (
    <div className={cx("header")}>
      <div
        className={cx("headerText")}
        onClick={() => {
          if (page === "home") return;
          goPage("home");
        }}
      >
        {"DYNAMIC_KWON"}
      </div>
      <div className={cx("headerBtn")}>
        <div
          className={cx("btnTitle")}
          onClick={() => {
            goPage("coding");
          }}
        >
          {"CODING"}
        </div>
        <div
          className={cx("btnTitle")}
          onClick={() => {
            goPage("info");
          }}
        >
          {"INFO"}
        </div>
        <div
          className={cx("btnTitle")}
          onClick={() => {
            goPage("portpolios");
          }}
        >
          {"PORTPOLIOS"}
        </div>
        <div
          className={cx("btnTitle")}
          onClick={() => {
            goPage("career");
          }}
        >
          {"CAREER"}
        </div>
      </div>
    </div>
  );
}
