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
    let cur = 0;
    const moveChild = (e: WheelEvent) => {
      if (e.deltaX > 0 || e.deltaX < 0) {
        e.preventDefault();
        e.stopPropagation();
        const parent = parentRef.current;
        const child = childRef.current;

        if (!parent || !child) return;

        const parentWidth = parent.getBoundingClientRect().width;

        console.log("moveChild", cur, e.deltaX, parseInt(width));
        if (
          cur + e.deltaX < 0 ||
          cur + e.deltaX + parentWidth > parseInt(width)
        )
          return;
        cur += e.deltaX;
        child.style.transform = `translateX(-${cur}px)`;
      }
    };
    const parent = parentRef.current;
    if (!parent) return;
    parent.addEventListener("wheel", moveChild);
    console.log("add wheel event");
    return () => {
      parent.removeEventListener("wheel", moveChild);
    };
  }, []);

  return (
    <div className={styles.container + " con"} ref={conRef}>
      <div
        className="cursive"
        style={{
          fontSize: "2.4rem",
          marginTop: "var(--margin-top)",
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
