import styles from "./name.module.css";

export default function Name({ name }: { name: string }) {
  const { groom, bride } = JSON.parse(name);
  console.log(name);
  return (
    <div className={styles.container}>
      <div>
        <div
          className={styles.block + " cursive"}
          style={{ fontSize: "14px", marginLeft: "10px" }}
        >
          groom
        </div>
        <div
          className={styles.block}
          style={{
            width: "100px",
            height: "30px",
            letterSpacing: "5px",
            fontSize: "16px",
          }}
        >
          {groom}
        </div>
      </div>
      <div className={styles.line} />
      <div>
        <div
          className={styles.block + " cursive"}
          style={{ fontSize: "14px", marginLeft: "10px" }}
        >
          bride
        </div>
        <div
          className={styles.block}
          style={{
            width: "100px",
            height: "30px",
            letterSpacing: "5px",
            fontSize: "16px",
          }}
        >
          {bride}
        </div>
      </div>
    </div>
  );
}
