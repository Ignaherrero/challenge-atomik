import Head from "next/head";
import React from "react";
import parse from "html-react-parser";
import moment from "moment";
import Image from "next/image";

export default function Posts({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="title" content={post.metas.title} />
        <meta name="description" content={post.metas.description} />
        <meta name="image" content={post.metas.image} />
        <meta property="og:title" content={post.metas.title} />
        <meta property="og:type" content={post.metas.type} />
        <meta property="og:description" content={post.metas.description} />
        <meta property="og:image" content={post.metas.image} />
        <meta property="og:site_name" content={post.metas.site_name} />
        <meta property="og:image" content={post.metas.image} />
      </Head>

      <div className="container my-10 mx-auto">
        <section className="mb-32 text-gray-800">
          <div className="flex justify-center">
            <Image
              src={post.featured_media.large}
              alt=""
              width="921px"
              height="613px"
              loading="eager"
              priority={true}
              className="w-3/5 m-auto shadow-lg rounded-lg mb-6 object-cover"
            />
          </div>
          <div className="flex items-center mb-6">
            <div>
              <span>
                {post.author ? (
                  <div className="flex items-center mt-6">
                    <Image
                      src={post.author.picture}
                      className="rounded-full mr-2 h-8"
                      alt=""
                      loading="eager"
                      width="32px"
                      height="32px"
                    />
                    <div>
                      <span>
                        {" "}
                        Published {moment(post.published).format(
                          "llll"
                        )} by{" "}
                      </span>
                      <a href="#!" className="font-medium">
                        {post.author.name}
                      </a>
                    </div>
                  </div>
                ) : (
                  moment(post.published).format("llll")
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
