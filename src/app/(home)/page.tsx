import Link from "next/link";
import styles from "./page.module.css";

async function getData() {
  const response = await fetch("http://localhost:4000/api/wedding", {
    cache: "no-store",
  });
  return response.json();
}

export default async function Home() {
  const data = await getData();

  console.log(data);
  return (
    <div className={styles.container}>
      {data.map((info: { id: string; name: string; createdAt: string }) => {
        const { groom, bride } = JSON.parse(info.name);
        return (
          <div className={styles.row} key={info.id}>
            <span>신랑 : {groom}</span>
            <span>신부 : {bride}</span>
            <span>
              날짜 : {new Date(info.createdAt).toLocaleDateString("kor")}
            </span>
            <Link href={`/[slug]?id=${info.id}`}>청첩장으로 이동</Link>
          </div>
        );
      })}
    </div>
  );
}
