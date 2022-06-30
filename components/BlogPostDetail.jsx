import { Col, Row } from "antd";
import BlockContent from "@sanity/block-content-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";
const serializers = {
  types: {
    code: ({ node }) => {
      const { code } = node;
      return (
        <SyntaxHighlighter language="javascript"> {code}</SyntaxHighlighter>
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
  },
};
export default function BlogPostDetail({ blocks }) {
  return (
    <Row>
      <Col span={24} style={{ fontSize: 18, fontWeight: "bold", padding: 20 }}>
        <BlockContent
          blocks={blocks}
          projectId={process.env.SANITY_PROJECT_ID}
          dataset="production"
          serializers={serializers}
        ></BlockContent>
      </Col>
    </Row>
  );
}
