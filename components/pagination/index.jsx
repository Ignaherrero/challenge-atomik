import { useEffect } from "react";
import { statusFetch } from "../../helper/dictionary";
import { getOtherPage } from "../../helper/fetchs";

export default function Pagination({
  articles,
  getValues,
  setArticles,
  counter,
  increment,
  decrement,
}) {
  const { found, pending } = statusFetch;

  useEffect(() => {
    const getData = async () => {
      if (getValues("article")?.length > 0) {
        setArticles({ data: [], found: pending });
        const args = {
          relevant: getValues("relevant"),
          article: getValues("article"),
          counter,
        };
        const data = await getOtherPage(args);
        const { data: response } = data;
        setArticles({ ...response, found: found });
      }
    };

    getData();
  }, [counter, getValues, setArticles]);

  return (
    <>
      {articles?.data.length > 0 && (
        <div className="flex space-x-2 justify-center m-6">
          {counter > 1 && (
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              disabled={articles.found === pending}
              onClick={() => {
                decrement();
              }}
            >
              -
            </button>
          )}
          <p className="self-center	">{counter}</p>
          {counter < articles.pages && (
            <button
              type="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => {
                increment();
              }}
            >
              +
            </button>
          )}
        </div>
      )}
    </>
  );
}
