import { useEffect } from "react";
import { statusFetch } from "../../helper/dictionary";

export default function Pagination({
  articles,
  getValues,
  setArticles,
  counter,
  increment,
  decrement,
}) {
  useEffect(() => {
    const getOtherPage = async () => {
      if (getValues("article")?.length > 0) {
        setArticles({ data: [], found: statusFetch.pending });
        try {
          let response = await fetch(
            `https://beta.mejorconsalud.com/wp-json/mc/v3/posts?search=${getValues(
              "article"
            )}${
              getValues("relevant") ? `&orderby=${getValues("relevant")}` : ""
            }&page=${counter}`
          );
          let data = await response.json();
          setArticles({ ...data, found: statusFetch.found });
        } catch (err) {
          console.log(err);
        }
      }
    };

    getOtherPage();
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
              disabled={articles.found === statusFetch.pending}
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
