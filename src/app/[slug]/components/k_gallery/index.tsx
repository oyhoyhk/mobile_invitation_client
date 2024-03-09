"use client";

import Image from "next/image";
import styles from "./gallery.module.css";

export default function Gallery({ images }: { images: string[] }) {
  console.log(images);
  const serverUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  return (
    <div className={styles.container}>
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
