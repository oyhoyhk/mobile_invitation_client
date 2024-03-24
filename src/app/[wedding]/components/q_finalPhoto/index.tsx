"use client";

import styles from "./finalPhoto.module.css";
import Image from "next/image";
import { useRef } from "react";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";

export default function FinalPhoto({
  src,
  finalPhotoText,
  finalPhotoColor,
}: {
  src: string;
  finalPhotoText: string;
  finalPhotoColor: string;
}) {
  const conRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollFadeIn(conRef);

  return (
    <div className={styles.container + " con"} ref={conRef}>
      <Image
        ref={imageRef}
        sizes={"100vw"}
        src={process.env.NEXT_PUBLIC_IMAGE_URL + src.replaceAll("\\", "/")}
        alt="finalPhoto"
        width={0}
        height={0}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <div className={styles.cover} />
      <div className={styles.text} style={{ color: finalPhotoColor }}>
        {finalPhotoText}
      </div>
    </div>
  );
}
