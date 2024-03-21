"use client";

import { galleryState } from "@/app/lib/atom";
import Image from "next/image";
import { useRef } from "react";
import { useRecoilState } from "recoil";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function GalleryExtension({ list }: { list: any[] }) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [galleryInfo, setGalleryInfo] = useRecoilState(galleryState);
  return (
    <Slider {...settings}>
      <Image
        alt="gallery"
        src={
          process.env.NEXT_PUBLIC_IMAGE_URL +
          (galleryInfo as any).list[(galleryInfo as any).cur]
        }
        sizes="100vw"
        style={{
          width: "350px",
          height: "auto",
        }}
        width={350}
        height={350}
      />
    </Slider>
  );
}
