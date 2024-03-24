import type { Metadata } from "next";
import Head from "next/head";
import RecoilContextProvider from "../lib/RecoilProvider";

async function getData(id: string) {
  const res = await fetch(`${process.env.IMAGE_URL}api/wedding/${id}`);
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: { wedding: string };
}): Promise<Metadata> {
  const id = params.wedding;

  const data = await fetch(`${process.env.IMAGE_URL}api/wedding/${id}`).then(
    (res) => res.json()
  );

  const name = data ? JSON.parse(data.name) : { groom: "", bride: "" };
  const photo = data
    ? data.images.filter((el: any) => el.url.includes("finalPhoto"))[0].url
    : "";

  return {
    title: `${name.groom}❤️${name.bride} 결혼합니다!`,
    description: `${data?.firstDescription || ""}`,
    openGraph: {
      title: `${name.groom}❤️${name.bride} 결혼합니다!`,
      description: `${data?.firstDescription || ""}`,
      url: process.env.IMAGE_URL,
      images: [process.env.IMAGE_URL + photo],
    },
  };
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    wedding: string;
  };
}>) {
  const id = params.wedding;
  const data = await getData(id);
  const name = data ? JSON.parse(data.name) : { groom: "", bride: "" };
  const photo = data
    ? data.images.filter((el: any) => el.url.includes("finalPhoto"))[0].url
    : "";

  return (
    <html lang="en">
      <body>
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}
