"use client";

import Image from "next/image";
import styles from "./gallery.module.css";
import { useRef } from "react";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIN";

export default function Gallery({ images }: { images: string[] }) {
  const conRef = useRef<HTMLDivElement>(null);
  useScrollFadeIn(conRef);

  const serverUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  return (
    <div className={styles.container + " con"} ref={conRef}>
      <div className={styles.wrapper}>
        {images.map((image) => (
          <div key={image}>
            <Image src={serverUrl + image} alt="gallery" fill />
          </div>
        ))}
      </div>
    </div>
  );
}
