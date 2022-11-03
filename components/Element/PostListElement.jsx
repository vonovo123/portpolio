import styles from "../../styles/Element/PostListElement.module.css";
import { Row, Col, Image } from "antd";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import dayjs from "dayjs";
const cx = classNames.bind(styles);
export default function PostListElement({ element, goSlug }) {
  const router = useRouter();
  return (
    <div
      className={cx("elementWrapper")}
      onClick={() => {
        goSlug({ menu: element.category.slug, slug: element.slug });
      }}
    >
      <div className={cx("element")}>
        <div className={cx("elementImageWrapper")}>
          <Image
            src={element.thumbnail.imageUrl}
            alt={element.thumbnail.alt}
            className={cx("elementImage")}
            preview={false}
          />
        </div>
        <div className={cx("elementContentWrapper")}>
          <div className={cx("contentDate")}>
            {dayjs(element.createdAt).format("MMMM DD HH:mm:ss")}
          </div>
          <div className={cx("titleWrapper")}>
            <div className={cx("title")}>{element.title}</div>
            <div className={cx("subtitle")}> # {element.subtitle}</div>
          </div>

          <div className={cx("short")}>{element.postContent.markdown}</div>
        </div>
      </div>
    </div>
  );
}
