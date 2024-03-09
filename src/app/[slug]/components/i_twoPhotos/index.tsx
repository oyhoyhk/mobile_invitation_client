import getImageUrl from "@/app/lib/getImageUrl";
import styles from "./twoPhotos.module.css";

export default async function TwoPhotos({ urls }: { urls: string[] }) {
  console.log(urls);
  const serverUrl = await getImageUrl();
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${serverUrl + urls[0]})` }}
      />
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${serverUrl + urls[1]})` }}
      />
    </div>
  );
}
