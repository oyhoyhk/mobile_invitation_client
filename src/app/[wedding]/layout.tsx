"use client";

import type { Metadata } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { useSearchParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<any>(null);
  const id = searchParams[1];
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}api/wedding/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const name = data ? JSON.parse(data.name) : { groom: "", bride: "" };
  const photo = data
    ? data.images.filter((el: any) => el.url.includes("finalPhoto"))[0].url
    : "";
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {name.groom}❤️{name.bride} 결혼합니다!
        </title>
        <meta name="description" content={data?.firstDescription || ""} />
        <meta
          property="og:title"
          content={`${name.groom}❤️${name.bride} 결혼합니다!`}
        />
        <meta
          property="og:description"
          content={data?.firstDescription || ""}
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_IMAGE_URL + photo}
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_IMAGE_URL + photo}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="결혼식" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="결혼식" />
        <meta property="og:site_name" content="결혼식" />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <body>
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
