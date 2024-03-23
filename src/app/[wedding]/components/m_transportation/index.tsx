"use client";

import { useRef } from "react";
import styles from "./transportation.module.css";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";

const numberMapper = "①②③④⑤⑥⑦⑧⑨⑩";

export default function Transportation({
  transportation,
}: {
  transportation: string;
}) {
  const conRef = useRef<HTMLDivElement>(null);
  const transportationInfo = JSON.parse(transportation);

  useScrollFadeIn(conRef);

  return (
    <div className={styles.container + " con"} ref={conRef}>
      {Object.values(transportationInfo)
        .filter((info: any) => info.active)
        .map((info: any) => (
          <div className={styles.info} key={info.name}>
            <div className={styles.title}>
              <div
                className={styles.icon}
                style={{ backgroundImage: `url(${info.icon})` }}
              />
              {info.name === "버스" ? "버     스" : info.name}
            </div>
            {typeof info.routes === "object" &&
              info.routes.length > 0 &&
              info.routes.map((route: any, index: number) => (
                <div className={styles.route + " numbers"} key={route}>
                  <div className="number">{numberMapper[index]}</div>
                  <div className="route">{route}</div>
                </div>
              ))}
            {typeof info.route === "string" && info.route && (
              <div className={styles.route + " textarea"}>{info.route}</div>
            )}
          </div>
        ))}
    </div>
  );
}
