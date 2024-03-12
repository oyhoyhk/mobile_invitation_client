"use client";
import { useRef } from "react";
import styles from "./secondDescription.module.css";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";

export default function SecondDescription({
  description,
}: {
  description: string;
}) {
  const conRef = useRef<HTMLDivElement>(null);

  useScrollFadeIn(conRef);
  return (
    <div className={styles.container + " con"} ref={conRef}>
      {description}
    </div>
  );
}
