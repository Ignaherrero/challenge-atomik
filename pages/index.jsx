import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const statusFetch = {
  pending: "pending",
  resolved: "resolved",
  idle: "idle",
  found: "found",
  notfound: "notfound",
};

export default function Home() {
  const [articles, setArticles] = useState({
    data: [],
    found: statusFetch.idle,
  });
  const [page, setPage] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    article: "",
  });

  useEffect(() => {
    const getOtherPage = async () => {
      if (getValues("article").length > 0) {
        setArticles({ data: [], found: statusFetch.pending });
        try {
          let response = await fetch(
            `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${getValues(
              "article"
            )}${
              getValues("relevant") ? `&orderby=${getValues("relevant")}` : ""
            }&page=${page}`
          );
          let data = await response.json();
          setArticles({ ...data, found: statusFetch.found });
        } catch (err) {
          console.log(err);
        }
      }
    };

    getOtherPage();
  }, [page, getValues]);

  const onSubmit = async (dataForm) => {
    setArticles({ data: [], found: statusFetch.pending });
    try {
      let response = await fetch(
        `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${
          dataForm.article
        }${dataForm.relevant ? `&orderby=${dataForm.relevant}` : ""}`
      );
      let data = await response.json();
      if (data.size > 0) {
        setArticles({ ...data, found: statusFetch.found });
      } else {
        response = await fetch(
          "https://beta.mejorconsalud.com/wp-json/mc/v3/posts?orderby=date&order=desc"
        );
        data = await response.json();
        setArticles({ ...data, found: statusFetch.notFound });
      }
      setPage(1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>MejorConsalud</title>
      </Head>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
              <input
                {...register("article", { required: true, maxLength: 80 })}
                type="search"
                className="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="ej: calabaza, vitaminas, etc."
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                id="button-addon2"
                type="submit"
                aria-label="buscador"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="form-check">
              <input
                {...register("relevant")}
                type="checkbox"
                value="relevance"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="flexCheckDefault"
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="flexCheckDefault"
              >
                Relevante
              </label>
            </div>
          </div>
        </div>
      </form>
      {articles.found === statusFetch.notFound && (
        <>
          <h1>No se encontro el articulo</h1>
          <h2>Ultimos articulos publicados</h2>
        </>
      )}
      <div className="flex justify-center flex-wrap ">
        {articles?.data &&
          articles.data.map((article) => {
            return (
              <div
                className="rounded-lg shadow-lg bg-white max-w-sm"
                key={article.id}
              >
                <a href="#!">
                  <Image
                    className="rounded-t-lg object-fill h-64 w-full"
                    src={article.featured_media?.thumbnail}
                    alt=""
                    width={384}
                    height={200}
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    {article.title}
                  </h5>
                  <p className="text-gray-700 text-base mb-4">
                    Some quick example text to build on the card title and make
                    up the bulk of the cards content.
                  </p>
                  <Link
                    href={`/posts/[id]`}
                    as={`/posts/${article.id}`}
                    key={article.id}
                  >
                    Visitar
                  </Link>
                </div>
              </div>
            );
          })}
      </div>

      {articles?.data.length > 0 && (
        <div className="flex space-x-2 justify-center">
          {page > 1 && (
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              disabled={articles.found === statusFetch.pending}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              -
            </button>
          )}
          {page}
          {page < articles.pages && (
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              +
            </button>
          )}
        </div>
      )}

      {articles.found === statusFetch.pending && <p>cargando...</p>}
    </>
  );
}
