"use client";

import { useEffect, useRef } from "react";
import styles from "./mainPhoto.module.css";
import Image from "next/image";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";

export default function MainPhoto({ src }: { src: string }) {
  const conRef = useRef<HTMLDivElement>(null);

  useScrollFadeIn(conRef);
  return (
    <div className={styles.container + " con"} ref={conRef}>
      <Image
        src={process.env.NEXT_PUBLIC_IMAGE_URL + src.replaceAll("\\", "/")}
        sizes="100vw"
        width={0}
        height={0}
        alt={"mainPhoto"}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
