import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.bird} />
      <div className={styles.ribbon} />
      <div className={styles.text + " cursive"} style={{ top: "108px" }}>
        We are getting
      </div>
      <div className={styles.text + " cursive"} style={{ top: "140px" }}>
        Married
      </div>
    </div>
  );
}
