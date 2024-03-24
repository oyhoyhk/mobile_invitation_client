import styles from "./header.module.css";
import Title from "@/assets/title.svg";

export default function Header({
  topLabel,
  topImage,
}: {
  topLabel: string;
  topImage: string;
}) {
  return (
    <div className={styles.container}>
      <div
        className={styles.topLabel}
        style={{
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_IMAGE_URL + topLabel.replaceAll("\\", "/")
          })`,
        }}
      />
      <div
        className={styles.topImage}
        style={{
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_IMAGE_URL + topImage.replaceAll("\\", "/")
          })`,
        }}
      />
      <Title className={styles.title} />
    </div>
  );
}
