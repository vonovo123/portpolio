import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2342228861381156"
          crossOrigin="anonymous"
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content={"Dynamic_Kwon Dev Blog"} />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content={"금융권 프론트엔드 개발자 권현우의 기술 블로그입니다."}
        />
        <meta property="og:article:author" content="dynamic_kwon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
