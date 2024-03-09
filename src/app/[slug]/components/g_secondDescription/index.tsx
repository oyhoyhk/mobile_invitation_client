import styles from "./secondDescription.module.css";

export default function SecondDescription({
  description,
}: {
  description: string;
}) {
  console.log(description);
  return <div className={styles.container}>{description}</div>;
}
