import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import BlockContent from "@sanity/block-content-to-react";
import styles from "../styles/Slug.module.css";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const builder = imageUrlBuilder(
  sanityClient({
    dataset: "production",
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: "2022-06-18", // use a UTC date string
    token: process.env.SANITY_AUTH_TOKEN, // or leave blank for unauthenticated usage
    useCdn: process.env.NODE_ENV === "production",
  })
);
function urlFor(imageUrl) {
  return builder.image(imageUrl);
}
const serializers = {
  types: {
    code: ({ node }) => {
      const { code } = node;
      return (
        <div>
          <SyntaxHighlighter language="javascript" style={docco}>
            {code}
          </SyntaxHighlighter>
        </div>
      );
    },
    video: ({ node }) => {
      return <p>video</p>;
    },
    link: ({ node }) => {
      return <p>link</p>;
    },
    imageGallery: ({ node }) => {
      return <p>imageGallery</p>;
    },
    image: (props) => {
      return (
        <figure className={cx("img-wrapper")}>
          <figcaption className={cx("img-caption")}>
            # {props.node.caption}
          </figcaption>
          <img
            src={urlFor(props.node.asset).width(400).height(400).url()}
            alt={props.node.alt}
            style={{ borderRadius: "5px" }}
          />
        </figure>
      );
    },
  },
};

export default function BlogBlockContent({ blocks }) {
  return (
    blocks && (
      <div id="content">
        <BlockContent
          blocks={blocks}
          projectId={process.env.SANITY_PROJECT_ID}
          dataset="production"
          serializers={serializers}
        ></BlockContent>
      </div>
    )
  );
}
