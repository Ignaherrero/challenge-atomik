import Image from "next/image";
import Link from "next/link";
import { statusFetch } from "../../helper/constants";

export default function Card({ articles: { data, found } }) {
  const { NOTFOUND } = statusFetch;

  return (
    <>
      {found === NOTFOUND && (
        <>
          <h1 className="text-center">
            No se encontro el articulo... pero estos son los ultimos articulos
            publicados
          </h1>
          <h2 className="text-center"></h2>
        </>
      )}
      <div className="flex justify-center flex-wrap ">
        {data?.length > 0 &&
          data.map(({ featured_media, title, id, categories }) => {
            const { description } = categories[0];

            return (
              <div
                className="rounded-lg shadow-lg bg-white max-w-sm m-2 relative"
                key={id}
              >
                <a href="#!">
                  <Image
                    className="rounded-t-lg object-cover h-64 w-full"
                    src={featured_media.medium}	
                    alt=""
                    width={384}
                    height={200}
                    priority={true}
                    loading="eager"
                  />
                </a>
                <div className="pt-6 pl-6 pr-6 pb-10">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">
                    {title}
                  </h5>
                  <p className="text-gray-700 text-base mb-4">{description}</p>
                  <div className="absolute bottom-0 left-40">
                    <Link href={`/posts/[id]`} as={`/posts/${id}`} key={id}>
                      Leer mas
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
