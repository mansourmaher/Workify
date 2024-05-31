"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function HeroBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => (prev === 5 ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[500px] relative bg-cover w-full">
      <div className="absolute top-0 right-0 w-[120vw] h-full transition-opacity z-0">
        <Image
          alt="hero-banner"
          src="/mm.png"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero-banner"
          src="/nn.png"
          fill
          className={`${
            image === 2 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero-banner"
          src="/mm.png"
          fill
          className={`${
            image === 3 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero-banner"
          src="/nn.png"
          fill
          className={`${
            image === 4 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
      </div>
      <div className="z-1 relative w-[650px] flex justify-center flex-col h-full gap-5 ml-20">
        <h1 className="text-white text-5xl leading-snug">
          Find the perfect &nbsp;<i>freelancer</i> for your project
        </h1>
        <div className="flex align-middle">
          <div className="relative">
            {/* <input
              type="text"
              placeholder="Search for services"
              className="w-[500px] h-14 bg-white rounded-lg px-5"
            /> */}

            {/* <button className="absolute right-0 top-0 h-14 w-20 bg-blue-500 text-white rounded-r-lg">
              Search
            </button> */}
          </div>
        </div>
        <div className="text-white flex flex-row gap-4">
          Popular:
          <ul className="flex gap-2">
            <li className="text-sm py-1 px-8 border rounded-full hover:text-black transition-all duration-300 cursor-pointer">
              Web Development
            </li>
            <li className="text-sm py-1 px-8 border rounded-full hover:text-black transition-all duration-300 cursor-pointer">
              Wordpress
            </li>
            <li className="text-sm py-1 px-8 border rounded-full hover:text-black transition-all duration-300 cursor-pointer">
              Logo Design
            </li>
            <li className="text-sm py-1 px-8 border rounded-full hover:text-black transition-all duration-300 cursor-pointer">
              SEO
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
