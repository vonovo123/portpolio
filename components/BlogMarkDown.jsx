import SyntaxHighlighter from "react-syntax-highlighter";
import { docco, dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../styles/Slug.module.css";
// const serializers = {
//   types: {
//     code: ({ node }) => {
//       const { code } = node;
//       return (
//         <div>
//           <SyntaxHighlighter language="javascript" style={dracula}>
//             {code}
//           </SyntaxHighlighter>
//         </div>
//       );
//     },
//     video: ({ node }) => {
//       return <p>video</p>;
//     },
//     link: ({ node }) => {
//       return <p>link</p>;
//     },
//     imageGallery: ({ node }) => {
//       return <p>imageGallery</p>;
//     },
//   },
// };
export default function BlogMarkDown({ markdown }) {
  return (
    <div id="content">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={docco}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          em: ({ node, ...props }) => <i className={styles.em} {...props} />,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
