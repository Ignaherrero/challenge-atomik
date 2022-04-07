import { nanoid } from "nanoid";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [articles, setArticles] = useState({ found: "pending" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (dataForm) => {
    try {
      let response = await fetch(
        `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${dataForm?.article}`
      );
      let data = await response.json();
      if (data.size > 0) {
        setArticles({ ...data, found: "found" });
      } else {
        response = await fetch(
          "https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc"
        );
        data = await response.json();
        setArticles({ ...data, found: "notfound" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (dataForm) => {
    try {
      let response = await fetch(
        `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${dataForm.article}&orderby=${dataForm.relevant}`
      );
      let data = await response.json();
      if (data.size > 0) {
        setArticles({ ...data, found: "found" });
      } else {
        response = await fetch(
          "https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc"
        );
        data = await response.json();
        setArticles({ ...data, found: "notfound" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("article")} placeholder="ingresar articulo" />
        <p>
          <input {...register("relevant")} type="checkbox" value="relevance" />
          relevante
        </p>
        <button type="submit">Submit</button>
      </form>
      {articles.found === "notfound" && (
        <>
          <h1>No se encontro el articulo</h1>
          <h2>Ultimos articulos publicados</h2>
        </>
      )}
      {articles?.data &&
        articles.data.map((article) => {
          return (
            <Link
              href={`/posts/[id]`}
              as={`/posts/${article.id}`}
              key={article.id}
            >
              {article.title}
            </Link>
          );
        })}
    </>
  );
}

// export async function getServerSideProps() {
//   const response = await fetch(
//     "https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc"
//   );
//   const articles = await response.json();

//   return {
//     props: { articles } || null,
//   };
// }
