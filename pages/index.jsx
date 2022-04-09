import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../components/card";
import Pagination from "../components/pagination";
import Search from "../components/search";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    article: "",
  });

  return (
    <>
      <Head>
        <title>MejorConsalud</title>
        <meta name="description" content="contenido saludable" />
      </Head>

      <Search articles={articles} setArticles={setArticles} handleSubmit={handleSubmit} register={register}/>

      <Card articles={articles} />

      <Pagination
        articles={articles}
        getValues={getValues}
        setArticles={setArticles}
      />
    </>
  );
}
