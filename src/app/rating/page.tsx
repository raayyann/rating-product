import Image from "next/image";
import title from "../../../public/title.svg";
import { db } from "../lib/db";

export const dynamic = "force-dynamic";

export default async function Rating() {
  const rating = await db.rate.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  const star = (
    await db.rate.aggregate({
      _avg: {
        star: true,
      },
    })
  )._avg.star;

  return (
    <div className="flex flex-col items-center">
      <Image
        src={title}
        alt="Ubi Bakar Madu"
        className="mt-12"
        width={600}
        height={200}
      />
      <p className="font-semibold text-xl -mt-12">
        {star}/5 Rating ({rating.length})
      </p>
      <div className="flex space-x-2 mt-2">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={Math.ceil(star!) >= index + 1 ? "fill-yellow-400" : ""}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width={64}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
            />
          </svg>
        ))}
      </div>
      <div className="space-y-4 flex flex-col items-center w-full">
        {rating.map((rate) => (
          <div
            className="bg-white p-4 rounded-md shadow-md lg:w-1/2 xl:w-1/3 w-5/6"
            key={rate.id}
          >
            <div className="flex space-x-2 mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={rate.star >= index + 1 ? "fill-yellow-400" : ""}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.785.57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-xs text-slate-600 mx-1">
              {rate.createdAt.toLocaleString()}
            </span>
            <p className="mx-1">{rate.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
