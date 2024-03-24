import styles from "./name.module.css";
import Groom from "@/assets/Groom.svg";
import Bride from "@/assets/Bride.svg";

export default function Name({ name }: { name: string }) {
  const { groom, bride } = JSON.parse(name);
  return (
    <div className={styles.container}>
      <div>
        <div
          className={styles.block + " cursive"}
          style={{ width: "100px", height: "19px", position: "relative" }}
        >
          <Groom
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
        <div
          className={styles.block}
          style={{
            width: "100px",
            height: "30px",
            letterSpacing: "5px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {groom}
        </div>
      </div>
      <div className={styles.line} />
      <div>
        <div
          className={styles.block + " cursive"}
          style={{ width: "100px", height: "19px", position: "relative" }}
        >
          <Bride
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
        <div
          className={styles.block}
          style={{
            width: "100px",
            height: "30px",
            letterSpacing: "5px",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {bride}
        </div>
      </div>
    </div>
  );
}
