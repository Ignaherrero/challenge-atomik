import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const [articles, setArticles] = useState({ found: "pending" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataForm) => {
    try {
      let response = await fetch(
        `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${
          dataForm.article
        }${dataForm.relevant ? `&relevant=${dataForm.relevant}` : ""}`
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
        <input
          {...register("article", { required: true, maxLength: 80 })}
          placeholder="ingresar articulo"
        />
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
