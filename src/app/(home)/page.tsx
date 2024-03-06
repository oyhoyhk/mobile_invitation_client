import Link from "next/link";
import styles from "./page.module.css";

async function getData() {
  const response = await fetch("http://localhost:4000/api/wedding");
  return response.json();
}

export default async function Home() {
  const data = await getData();
  const handleClick = (id: string) => {
    // 클릭 시 `[slug]` 페이지로 이동하고 id 값을 전달
    window.location.href = `/[slug]?id=${id}`;
  };
  console.log(data);
  return (
    <div className={styles.container}>
      {data.map((info: { id: string }) => {
        const [dateString, groom, bride] = info.id.split("-");
        return (
          <div className={styles.row} key={info.id}>
            <span>신랑 : {groom}</span>
            <span>신부 : {bride}</span>
            <span>
              날짜 : {new Date(Number(dateString)).toLocaleDateString()}
            </span>
            <Link href={`/[slug]?id=${info.id}`}>청첩장으로 이동</Link>
          </div>
        );
      })}
    </div>
  );
}
