import HeartClip from "@/assets/heartClip";
import styles from "./clippedImage.module.css";

export default function ClippedImage({
  color,
  src,
}: {
  color: string;
  src: string;
}) {
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_IMAGE_URL + src.replaceAll("\\", "/")
          })`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />
      {/* <HeartClip color={color} /> */}
    </div>
  );
}
