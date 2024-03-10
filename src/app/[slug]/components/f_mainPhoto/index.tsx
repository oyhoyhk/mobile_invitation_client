import getImageUrl from "@/app/lib/getImageUrl";
import styles from "./mainPhoto.module.css";
import Image from "next/image";

export default async function MainPhoto({ src }: { src: string }) {
  console.log(src);
  const serverUrl = await getImageUrl();
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={serverUrl + src}
        layout="fill"
        alt="mainPhoto"
      />
    </div>
  );
}
