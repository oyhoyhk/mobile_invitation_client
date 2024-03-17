"use client";

import { galleryState } from "@/app/lib/atom";
import Image from "next/image";
import { useRecoilState } from "recoil";

export default function GalleryExtension() {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 100,
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Image
        alt="gallery"
        sizes="100vw"
        width={0}
        height={0}
        src={
          //   process.env.NEXT_PUBLIC_IMAGE_URL + galleryInfo.list[galleryInfo.cur]
        }
      />{" "} */}
    </div>
  );
}
