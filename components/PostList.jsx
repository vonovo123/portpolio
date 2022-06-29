import { Row, Col, Card, Descriptions, Image } from "antd";
import dayjs from "dayjs";
import styles from "../styles/Post.module.css";
import classNames from "classnames/bind";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const cx = classNames.bind(styles);
export default function PostList({ posts, view, throttleGetView }) {
  const [hoverIdx, setHoverIdx] = useState(-1);
  const router = useRouter();
  const goDetail = (slug) => {
    console.log("slug: ", slug);
    console.log(throttleGetView);
    window.removeEventListener("scroll", throttleGetView);
    router.push(`/post/${slug}`);
  };
  return (
    <div id="post" className={cx("postList")}>
      <div className={styles.titleWrapper}>
        <div className={cx("titleCover", { sel: view === "post" })}></div>
        <div className={cx("titleText", { sel: view === "post" })}>Post</div>
      </div>
      <Row span={24} align="top" style={{ height: "auto" }}>
        {posts.map((post, idx) => {
          return (
            <Col
              span={24}
              className={cx("postWrapper")}
              key={post.slug}
              onClick={() => {
                goDetail(post.slug);
              }}
            >
              {/* <Link href={`/post/${post.slug}`}> */}
              <div className={cx("post")}>
                <div className={cx("postImageWrapper")}>
                  <Image
                    src={post.thumbnail.imageUrl}
                    alt={post.thumbnail.alt}
                    className={cx("postImage")}
                    preview={false}
                  />
                </div>
                <Card className={cx("postCard")}>
                  <div className={cx("postTitleWrapper")}>
                    <div className={cx("postTitle")}>{post.title}</div>
                  </div>
                  <div className={cx("postInfoWrapper")}>
                    <span className={cx("postDate")}>
                      {dayjs(post.createdAt).format("MMMM DD / YYYY ")}
                    </span>
                    <span className={cx("postAutor")}>{post.author.name} </span>
                  </div>
                  <div className={cx("postShort")}>{post.shortContent}</div>
                </Card>
                <div className={cx("postTag")}>개발</div>
              </div>
              {/* </Link> */}
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
