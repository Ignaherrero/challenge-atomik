import Head from "next/head";
import React from "react";
import parse from "html-react-parser";
import moment from "moment";
import Image from "next/image";
import { getDateDayMonthYear } from "../../helper/data";

export default function Posts({
  post: {
    author: { name, picture },
    metas: { title, description, image, type, site_name },
    featured_media,
    content,
    bibliography,
    published,
  },
}) {
  const sizeImages = Object.getOwnPropertyNames(featured_media);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content={type} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={site_name} />
        <meta property="og:image" content={image} />
      </Head>

      <div className="container my-10 mx-auto">
        <section className="mb-32 text-gray-800">
          <div className="flex justify-center">
            <Image
              src={featured_media[sizeImages[5]]}
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
                {name ? (
                  <div className="flex items-center mt-6">
                    <Image
                      src={picture}
                      className="rounded-full mr-2 h-8"
                      alt=""
                      loading="eager"
                      width="32px"
                      height="32px"
                    />
                    <div className="ml-2">
                      <span>
                        {" "}
                        Publicado {getDateDayMonthYear(published)} by{" "}
                      </span>
                      <a href="#!" className="font-medium">
                        {name}
                      </a>
                    </div>
                  </div>
                ) : (
                  moment(published).format("llll")
                )}
              </span>
            </div>
          </div>

          <h1 className="font-bold text-3xl mb-6">{title}</h1>

          {parse(content)}

          {bibliography && (
            <>
              <h1 className="font-bold text-3xl mb-2 mt-4">Bibliografia</h1>
              {parse(bibliography)}
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
