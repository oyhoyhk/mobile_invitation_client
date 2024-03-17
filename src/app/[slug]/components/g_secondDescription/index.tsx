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
      <div
        className="cursive"
        style={{ fontSize: "2.4rem", marginTop: "var(--margin-top)" }}
      >
        Invite you
      </div>
      <div style={{ marginTop: "25px", marginBottom: "50px" }}>
        소중한 분들을 초대합니다
      </div>
      {description}
    </div>
  );
}
