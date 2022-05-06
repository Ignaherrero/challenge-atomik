import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { statusFetch } from "../helper/constants";
import { useCounter } from "../helper/useCounter";

const Search = dynamic(() => import("../components/search"));
const Card = dynamic(() => import("../components/card"), {
  ssr: false,
});
const Pagination = dynamic(() => import("../components/pagination"), {
  ssr: false,
});

export default function Home() {
  const { IDLE } = statusFetch;
  const [articles, setArticles] = useState({
    data: [],
    found: IDLE,
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
      <Suspense fallback={`...loading`}>
        <Search
          articles={articles}
          setArticles={setArticles}
          handleSubmit={handleSubmit}
          register={register}
          reset={reset}
        />
      </Suspense>
      <Suspense fallback={`...loading`}>
        <Card articles={articles} />
      </Suspense>
      <Suspense fallback={`...loading`}>
        <Pagination
          articles={articles}
          getValues={getValues}
          setArticles={setArticles}
          counter={counter}
          increment={increment}
          decrement={decrement}
        />
      </Suspense>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 259200,
  };
}
