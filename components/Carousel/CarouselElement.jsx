import styles from "../../styles/Carousel/CarouselElement.module.css";
import { Row, Col, Image } from "antd";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
const cx = classNames.bind(styles);
export default function CarouselElement({ element, goPage }) {
  const router = useRouter();
  return (
    <div
      className={cx("elementWrapper")}
      onClick={() => {
        goPage("post", element.slug);
      }}
    >
      <div className={cx("element")}>
        <div className={cx("elementInnerWrapper")}>
          <Image
            src={element.thumbnail.imageUrl}
            alt={element.thumbnail.alt}
            className={cx("elementImage")}
          />
          <div className={cx("elementContentWrapper")}>
            <div className={cx("title")}>{element.title}</div>
            <div className={cx("short")}>{element.shortContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
