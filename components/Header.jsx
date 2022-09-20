import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Header({ goPage, pageState }) {
  const [page, setPage] = pageState;
  const headerMenuInfo = {
    coding: "CODING",
    info: "INFO",
    portpolios: "PORTPOLIOS",
    career: "CAREER",
  };
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
        {Object.entries(headerMenuInfo).map(([key, value], idx) => (
          <div
            className={cx("btnTitle")}
            key={idx}
            onClick={() => {
              if (page === key) return;
              goPage(key);
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
