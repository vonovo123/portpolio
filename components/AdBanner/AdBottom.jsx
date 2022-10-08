import { useEffect } from "react";
import styles from "../../styles/Ad.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function AdBottom({}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ins
      className={cx("adsbygoogle", "ad", "bottom")}
      style={{ display: "block", height: "100px", width: "100%" }}
      data-ad-client="ca-pub-2342228861381156"
      data-ad-slot="3648326424"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
