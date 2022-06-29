import SanityService from "../../services/SanityService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";
import BlogPostDetail from "../../components/BlogPostDetail";
export default function PostAll({ slug, post }) {
  return (
    <div>
      <div className={styles.header}>
        <Header view={"home"} showNav={false} />
      </div>
      <div className={styles.container}>
        <div className={styles.slugContent}></div>
        <BlogPostDetail blocks={post.content} />
        <Footer />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const sanityService = new SanityService();
  const posts = await sanityService.getPosts();
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { slug } = params;
  const sanityService = new SanityService();
  const posts = await sanityService.getPosts();
  const post = posts.find((post) => post.slug === slug);
  return {
    props: {
      slug,
      post,
    },
  };
}
