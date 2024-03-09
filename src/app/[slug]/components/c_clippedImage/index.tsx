import Image from "next/image";
import Heart from "../../../../assets/heartClip.svg";
import styles from "./clippedImage.module.css";
import { HeartClip } from "./HeartClip";
import getImageUrl from "@/app/lib/getImageUrl";

export default async function ClippedImage({ src }: { src: string }) {
  console.log(src);
  const imageUrl = await getImageUrl();
  return (
    <div className={styles.container}>
      <Image
        src={imageUrl + src}
        alt="clippedImage"
        className={styles.image}
        width={100}
        height={100}
      />
      <HeartClip />
    </div>
  );
}
