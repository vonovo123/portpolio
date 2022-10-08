import { useEffect } from "react";
import styles from "../../styles/Ad.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
export default function AdTop({}) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ins
      // className="adsbygoogle"
      className={cx("adsbygoogle", "ad", "top")}
      //style="display:inline-block;min-width:100px;max-width:500px;width:100%;height:100px"
      data-ad-client="ca-pub-2342228861381156"
      data-ad-slot="6441725316"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
