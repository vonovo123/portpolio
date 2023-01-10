import Head from "next/head";

const HeadMeta = ({ url, image }) => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:url" content={url || "https://dynamic-kwon.dev"} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

export default HeadMeta;
