import getImageUrl from "@/app/lib/getImageUrl";
import styles from "./mainPhoto.module.css";

export default async function MainPhoto({ src }: { src: string }) {
  console.log(src);
  const serverUrl = await getImageUrl();
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${serverUrl + src})` }}
    />
  );
}
