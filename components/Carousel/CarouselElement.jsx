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
        goPage({ def: "slug", slug: element.slug });
      }}
    >
      <div className={cx("element")}>
        <div className={cx("elementInnerWrapper")}>
          <Image
            src={element.thumbnail.imageUrl}
            alt={element.thumbnail.alt}
            className={cx("elementImage")}
            preview={false}
          />
          <div className={cx("elementContentWrapper")}>
            <div className={cx("title")}>{element.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
