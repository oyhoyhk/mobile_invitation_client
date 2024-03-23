import Link from "next/link";
import styles from "./page.module.css";

async function getData() {
  const response = await fetch(process.env.IMAGE_URL + "api/wedding", {
    cache: "no-store",
  });
  return response.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div className={styles.container}>
      <div style={{ fontSize: "2rem", marginBottom: "20px", color: "white" }}>
        청첩장 목록
      </div>
      {data.map((info: { id: string; name: string; createdAt: string }) => {
        const { groom, bride } = JSON.parse(info.name);
        return (
          <div className={styles.row} key={info.id}>
            <span>신랑 : {groom}</span>
            <span>신부 : {bride}</span>
            <span>
              날짜 : {new Date(info.createdAt).toLocaleDateString("kor")}
            </span>
            <Link
              href={`/[wedding]?id=${info.id}`}
              style={{
                borderRadius: "0.5rem",
                background: "#18acff",
                color: "white",
                padding: "10px 15px",
              }}
            >
              청첩장으로 이동
            </Link>
          </div>
        );
      })}
    </div>
  );
}
