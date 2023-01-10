import { useEffect } from "react";
import styles from "../../styles/Ad.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

export default function AdSide({}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ins
      className={cx("adsbygoogle", "ad", "side")}
      style={{ display: "block", width: "100%" }}
      data-ad-client="ca-pub-2342228861381156"
      data-ad-slot="7942794657"
      data-ad-format="auto"
      data-full-width-responsive="true"
    >
      {"Google AdSence Section"}
    </ins>
  );
}
