import Head from "next/head";
import React from "react";
import parse from "html-react-parser";
import moment from "moment";
export default function Posts({ post }) {
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

      <div className="container my-10 mx-auto">
        <section className="mb-32 text-gray-800">
          <img
            src={post.featured_media.large}
            className="w-3/5 m-auto shadow-lg rounded-lg mb-6 object-cover"
            alt=""
          />

          <div className="flex items-center mb-6">
            <div>
              <span>
                {moment(post.published).format("llll")}
                {post.author && (
                  <>
                    <span>
                      <a href="#!" className="font-medium">
                        {post.author}
                      </a>
                      by{" "}
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>

          <h1 className="font-bold text-3xl mb-6">{post.title}</h1>

          {parse(post.content)}

          {post.bibliography && (
            <>
              <h1 className="font-bold text-3xl mb-2 mt-4">Bibliografia</h1>
              {parse(post.bibliography)}
            </>
          )}
        </section>
      </div>
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
