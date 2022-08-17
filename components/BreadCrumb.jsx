import styles from "../styles/BreadCrum.module.css";
import { useCallback } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function BreadCrumb({ params }) {
  const router = useRouter();
  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);
  const renderCategory = (param, sel, idx, size) => {
    return (
      <div className={cx("breadCrumb")} key={idx}>
        <div className={cx("crumb", { sel: sel })}>
          {typeof param == "function" && <>{param()}</>}
          {typeof param == "string" && <>{param}</>}
        </div>
        {idx < size - 1 && <div className={cx("crumb")}>{"-"}</div>}
      </div>
    );
  };

  return (
    <div className={cx("breadCrumbWrapper")} span={24}>
      {params.map((param, idx) => {
        let sel = false;
        if (idx === params.length - 1) sel = true;
        return renderCategory(param, sel, idx, params.length);
      })}
    </div>
  );
}
