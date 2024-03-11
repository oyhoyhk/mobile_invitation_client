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
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + urls[0]}
          layout="fill"
          alt="twoPhotos"
        />
      </div>
      <div className={styles.image}>
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + urls[1]}
          layout="fill"
          alt="twoPhotos"
        />
      </div>
    </div>
  );
}
