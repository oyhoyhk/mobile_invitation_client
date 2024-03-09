import styles from "./firstDescription.module.css";

export default function FirstDescription({
  description,
}: {
  description: string;
}) {
  console.log(description);
  return <div className={styles.container}>{description}</div>;
}
