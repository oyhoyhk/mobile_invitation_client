import getImageUrl from "@/app/lib/getImageUrl";
import styles from "./finalPhoto.module.css";

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
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${serverUrl + src})` }}
    >
      <div className={styles.cover} />
      <div className={styles.text} style={{ color: finalPhotoColor }}>
        {finalPhotoText}
      </div>
    </div>
  );
}
