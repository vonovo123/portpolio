import styles from "../styles/Header.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function Header({ goPage, pageState }) {
  const [page, setPage] = pageState;
  const headerMenuInfo = {
    coding: "개발",
    info: "정보",
    portpolios: "포트폴리오",
    career: "커리어",
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
        {"다이나믹_권"}
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
