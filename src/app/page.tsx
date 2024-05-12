"use client";
import Image from "next/image";
import title from "../../public/title.svg";
import { useState } from "react";

export default function Home() {
  const [star, setStar] = useState(0);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/rate", {
      method: "POST",
      body: JSON.stringify({ star, message }),
    });
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src={title}
        alt="Ubi Bakar Madu"
        className="mt-12"
        width={600}
        height={200}
      />
      <p className="font-semibold text-lg lg:w-1/2 xl:w-1/3 w-5/6 -mt-6">
        Terima kasih telah membeli produk Sötpotatis! Kami sangat menghargai
        dukungan Anda. Mohon luangkan waktu sebentar untuk memberikan penilaian
        dan feedback tentang pengalaman Anda dengan produk kami. Masukan Anda
        sangat berarti bagi kami untuk terus meningkatkan layanan kami.
      </p>
      {done ? (
        <p className="font-bold text-2xl lg:w-1/2 xl:w-1/3 w-5/6 text-center mt-12">
          Terima kasih sudah memberi feedback! 😱😊
        </p>
      ) : (
        <>
          <div className="flex space-x-2 mt-8">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                onClick={() => setStar(index + 1)}
                className={`cursor-pointer hover:fill-yellow-400 ${
                  star >= index + 1 ? "fill-yellow-400" : ""
                }`}
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
          <textarea
            placeholder="Pesan"
            className="p-4 rounded-md shadow-md lg:w-1/2 xl:w-1/3 w-5/6"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          <button
            className="py-2 mt-4 bg-[#bb521f] hover:bg-[#7f2f0c] text-white rounded-md shadow-md lg:w-1/2 xl:w-1/3 w-5/6 transition-colors"
            onClick={handleSubmit}
            disabled={loading}
          >
            Kirim
          </button>
        </>
      )}
      <div className="text-sm opacity-75 absolute bottom-5">
        website dibuat oleh rayyan (hengker) 🧑‍💻😎😎
      </div>
    </div>
  );
}
