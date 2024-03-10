import getImageUrl from "@/app/lib/getImageUrl";
import styles from "./twoPhotos.module.css";
import Image from "next/image";

export default async function TwoPhotos({ urls }: { urls: string[] }) {
  console.log(urls);
  const serverUrl = await getImageUrl();
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={serverUrl + urls[0]} layout="fill" alt="twoPhotos" />
      </div>
      <div className={styles.image}>
        <Image src={serverUrl + urls[1]} layout="fill" alt="twoPhotos" />
      </div>
    </div>
  );
}
