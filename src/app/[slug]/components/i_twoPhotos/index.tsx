"use client";

import styles from "./twoPhotos.module.css";
import Image from "next/image";
import { useRef } from "react";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";

export default function TwoPhotos({ urls }: { urls: string[] }) {
  const conRef = useRef<HTMLDivElement>(null);
  useScrollFadeIn(conRef);

  return (
    <div className={styles.container + " con"} ref={conRef}>
      <div className={styles.image}>
        <div
          style={{
            backgroundImage: `url(${
              process.env.NEXT_PUBLIC_IMAGE_URL + urls[0].replaceAll("\\", "/")
            })`,
          }}
        />
      </div>
      <div className={styles.image}>
        <div
          style={{
            backgroundImage: `url(${
              process.env.NEXT_PUBLIC_IMAGE_URL + urls[1].replaceAll("\\", "/")
            })`,
          }}
        />
      </div>
    </div>
  );
}
