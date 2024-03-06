import Header from "./components/a_header";
import styles from "./page.module.css";

async function getData(id: string) {
  const response = await fetch(`http://localhost:4000/api/wedding/${id}`);
  return response.json();
}

export default async function Slug({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id;
  const data = await getData(id);
  console.log(data);
  return (
    <div className={styles.container} style={{ background: data.themeColor }}>
      <Header />
    </div>
  );
}
