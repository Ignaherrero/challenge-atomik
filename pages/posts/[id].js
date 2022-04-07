import Head from "next/head";
import React from "react";
import parse from "html-react-parser";
import moment from "moment";
export default function Posts({ post }) {
  console.log(post);
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={post.metas.title} />
        <meta property="og:type" content={post.metas.type} />
        <meta property="og:description" content={post.metas.description} />
        <meta property="og:image" content={post.metas.image} />
        <meta property="og:site_name" content={post.metas.site_name} />
        <meta property="og:description" content={post.metas.description} />
        <meta property="og:image" content={post.metas.image} />
      </Head>
      <h1>{post.title}</h1>
      <p>{post.bibliography}</p>
      <p>{post.categories.name}</p>
      <p>{moment(post.published).format("llll")}</p>
      {/* {post.content}
      {JSON.stringify(post.content)} */}
      {parse(post.content)}
    </>
  );
}

export async function getServerSideProps({ params }) {
  const response = await fetch(
    `https://beta.mejorconsalud.com/wp-json/mc/v3/posts/${params.id}`
  );
  const post = await response.json();
  return {
    props: { post } || null,
  };
}
