import getImageUrl from "@/app/lib/getImageUrl";
import styles from "./finalPhoto.module.css";
import Image from "next/image";

export default async function FinalPhoto({
  src,
  finalPhotoText,
  finalPhotoColor,
}: {
  src: string;
  finalPhotoText: string;
  finalPhotoColor: string;
}) {
  const serverUrl = await getImageUrl();
  return (
    <div className={styles.container}>
      <Image src={serverUrl + src} layout="fill" alt="finalPhoto" />
      <div className={styles.cover} />
      <div className={styles.text} style={{ color: finalPhotoColor }}>
        {finalPhotoText}
      </div>
    </div>
  );
}
