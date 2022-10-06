import { useEffect } from "react";

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
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2342228861381156"
      data-ad-slot="7942794657"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
