import styles from "./info.module.css";

export default function Info({ info }: { info: string }) {
  console.log(info);
  const { time, location } = JSON.parse(info);
  return (
    <div className={styles.container}>
      <div>{time}</div>
      <div>{location}</div>
    </div>
  );
}
