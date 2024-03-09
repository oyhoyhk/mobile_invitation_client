import styles from "./family.module.css";
import Mum from "../../../../assets/mum.svg";

export default function Family({
  family,
  name,
}: {
  family: string;
  name: string;
}) {
  console.log(family);
  const familyInfo = JSON.parse(family);
  const { groom, bride } = JSON.parse(name);
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {!familyInfo.groom.father.alive ? (
          <Mum />
        ) : !familyInfo.groom.father.alive || !familyInfo.bride.father.alive ? (
          <span style={{ width: "15px", height: "15px", margin: 0 }} />
        ) : (
          ""
        )}
        <b
          className={familyInfo.groom.father.name ? "" : "empty"}
          style={{ width: "60px" }}
        >
          {familyInfo.groom.father.name || "신랑 父"}
        </b>
        <span>•</span>
        {!familyInfo.groom.mother.alive ? (
          <Mum />
        ) : !familyInfo.groom.mother.alive || !familyInfo.bride.mother.alive ? (
          <span style={{ width: "15px", height: "15px", margin: 0 }} />
        ) : (
          ""
        )}
        <b
          className={familyInfo.groom.mother.name ? "" : "empty"}
          style={{ width: "60px" }}
        >
          {" "}
          {familyInfo.groom.mother.name || "신랑 母"}
        </b>
        <span style={{ fontSize: "12px" }}>의</span>
        <b
          className={familyInfo.groom.position ? "" : "empty"}
          style={{ width: "46px", textAlign: "left" }}
        >
          {familyInfo.groom.position || "호칭"}
        </b>
        <b className={groom ? "" : "empty"} style={{ width: "58px" }}>
          {" "}
          {groom || "신랑이름"}
        </b>
      </div>
      <div className={styles.text}>
        {!familyInfo.bride.father.alive ? (
          <Mum />
        ) : !familyInfo.bride.father.alive || !familyInfo.groom.father.alive ? (
          <span style={{ width: "15px", height: "15px", margin: 0 }} />
        ) : (
          ""
        )}
        <b
          className={familyInfo.bride.father.name ? "" : "empty"}
          style={{ width: "60px" }}
        >
          {familyInfo.bride.father.name || "신부 父"}
        </b>
        <span>•</span>
        {!familyInfo.bride.mother.alive ? (
          <Mum />
        ) : !familyInfo.bride.mother.alive || !familyInfo.groom.mother.alive ? (
          <span style={{ width: "15px", height: "15px", margin: 0 }} />
        ) : (
          ""
        )}
        <b
          className={familyInfo.bride.mother.name ? "" : "empty"}
          style={{ width: "60px" }}
        >
          {familyInfo.bride.mother.name || "신부 母"}
        </b>
        <span style={{ fontSize: "12px" }}>의</span>
        <b
          className={familyInfo.bride.position ? "" : "empty"}
          style={{ width: "46px", textAlign: "left" }}
        >
          {familyInfo.bride.position || "호칭"}
        </b>
        <b style={{ width: "58px" }} className={bride ? "" : "empty"}>
          {" "}
          {bride || "신부이름"}
        </b>
      </div>
    </div>
  );
}
