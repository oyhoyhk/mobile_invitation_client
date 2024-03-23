import styles from "./firstDescription.module.css";

export default function FirstDescription({
  description,
}: {
  description: string;
}) {
  return <div className={styles.container}>{description}</div>;
}
