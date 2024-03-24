import styles from "./header.module.css";

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
      <div className={styles.text + " cursive"} style={{ top: "108px" }}>
        We are getting
      </div>
      <div className={styles.text + " cursive"} style={{ top: "140px" }}>
        Married
      </div>
    </div>
  );
}
