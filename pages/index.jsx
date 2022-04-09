import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCounter } from "../helper/useCounter";
const Card=dynamic(()=>import("../components/card"));
const Pagination=dynamic(()=>import("../components/pagination"));
const Search=dynamic(()=>import("../components/search"));

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
  const { counter, increment, decrement, reset } = useCounter();
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

      <Search
        articles={articles}
        setArticles={setArticles}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
      />

      <Card articles={articles} />

      <Pagination
        articles={articles}
        getValues={getValues}
        setArticles={setArticles}
        counter={counter}
        increment={increment}
        decrement={decrement}
      />
    </>
  );
}
