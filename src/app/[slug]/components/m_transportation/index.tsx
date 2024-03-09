import styles from "./transportation.module.css";

const numberMapper = "①②③④⑤⑥⑦⑧⑨⑩";

export default function Transportation({
  transportation,
}: {
  transportation: string;
}) {
  console.log(transportation);
  const transportationInfo = JSON.parse(transportation);
  return (
    <div className={styles.container}>
      {Object.values(transportationInfo)
        .filter((info: any) => info.active)
        .map((info: any) => (
          <div className={styles.info} key={info.name}>
            <div className={styles.title}>
              <div
                className={styles.icon}
                style={{ backgroundImage: `url(${info.icon})` }}
              />
              {info.name}
            </div>
            {typeof info.routes === "object" &&
              info.routes.length > 0 &&
              info.routes.map((route: any, index: number) => (
                <div className={styles.route} key={route}>
                  {numberMapper[index]} {route}
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
