"use client";

import Image from "next/image";
import styles from "./gallery.module.css";
import { useEffect, useRef, useState } from "react";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";
import { useSetRecoilState } from "recoil";
import { galleryState } from "@/app/lib/atom";

export default function Gallery({ images }: { images: string[] }) {
  const setGalleryInfo = useSetRecoilState(galleryState);
  const conRef = useRef<HTMLDivElement>(null);
  useScrollFadeIn(conRef);

  const serverUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  const width = 220 * Math.ceil(images.length / 2) + "px";

  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const clickImage = (idx: number, list: string[]) => {
    setGalleryInfo({ cur: idx, list });
  };

  useEffect(() => {
    const moveChild = (e: WheelEvent) => {
      let cur = 0;
      if (e.deltaX > 0 || e.deltaX < 0) {
        e.preventDefault();
        e.stopPropagation();
        const parent = parentRef.current;
        const child = childRef.current;

        if (!parent || !child) return;

        const parentWidth = parent.getBoundingClientRect().width;

        if (
          cur + e.deltaX < 0 ||
          cur + e.deltaX + parentWidth > parseInt(width)
        )
          return;
        cur += e.deltaX;
        child.style.transform = `translateX(-${cur}px)`;
      }
    };

    const touchChild = (e: TouchEvent) => {
      let cur = 0;
      const parent = parentRef.current;
      const child = childRef.current;

      if (!parent || !child) return;

      const parentWidth = parent.getBoundingClientRect().width;

      if (
        cur + e.touches[0].clientX < 0 ||
        cur + e.touches[0].clientX + parentWidth > parseInt(width)
      )
        return;
      cur += e.touches[0].clientX;
      child.style.transform = `translateX(-${cur}px)`;
    };

    const parent = parentRef.current;
    if (!parent) return;
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      "android",
      "webos",
      "iphone",
      "ipad",
      "ipod",
      "blackberry",
      "iemobile",
      "opera mini",
      "mobile",
      "windows phone",
    ];

    const isMobile = mobileKeywords.some((keyword) =>
      userAgent.includes(keyword)
    );
    if (isMobile) {
      parent.addEventListener("touchmove", touchChild, { passive: false });
    } else {
      parent.addEventListener("wheel", moveChild);
    }
    return () => {
      if (isMobile) {
        parent.removeEventListener("touchmove", touchChild);
      } else {
        parent.removeEventListener("wheel", moveChild);
      }
    };
  }, []);

  return (
    <div className={styles.container + " con"} ref={conRef}>
      <div
        className="cursive"
        style={{
          fontSize: "2.3rem",
          marginTop: "var(--margin-top)",
          marginLeft: "20px",
          marginBottom: "50px",
        }}
      >
        Gallery
      </div>
      <div ref={parentRef} style={{ width: "100%", overflow: "hidden" }}>
        <div ref={childRef} className={styles.wrapper} style={{ width }}>
          {images.map((image, idx) => (
            <div key={image} onClick={() => clickImage(idx, images)}>
              <Image
                src={serverUrl + image}
                alt="gallery"
                sizes="100vw"
                width={0}
                height={0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
