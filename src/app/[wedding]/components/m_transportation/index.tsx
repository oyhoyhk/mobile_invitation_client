"use client";

import { useRef } from "react";
import styles from "./transportation.module.css";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";
import Car from "@/assets/car.svg";
import Bus from "@/assets/bus.svg";
import Subway from "@/assets/subway.svg";
import React from "react";

const numberMapper = "①②③④⑤⑥⑦⑧⑨⑩";

export default function Transportation({
  transportation,
  color,
}: {
  transportation: string;
  color: string;
}) {
  const conRef = useRef<HTMLDivElement>(null);
  const transportationInfo = JSON.parse(transportation);

  useScrollFadeIn(conRef);

  console.log(transportationInfo);

  const iconMappper = (name: "버스" | "지하철" | "자가용" | "전세버스") => {
    switch (name) {
      case "버스":
        return Bus;
      case "지하철":
        return Subway;
      case "자가용":
        return Car;
      case "전세버스":
        return Bus;
    }
  };

  return (
    <div className={styles.container + " con"} ref={conRef}>
      {Object.values(transportationInfo)
        .filter((info: any) => info.active)
        .map((info: any) => (
          <div className={styles.info} key={info.name}>
            <div className={styles.title}>
              <div className={styles.icon} style={{ background: color }}>
                {React.createElement(iconMappper(info.name))}
              </div>
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
