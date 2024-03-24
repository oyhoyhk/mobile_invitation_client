"use client";

import styles from "./attendee.module.css";
import Trash from "@/assets/trash.svg";
import Checked from "@/assets/checked.svg";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const createData = () => {
  const data = [];

  for (let i = 0; i < 300; i++) {
    const randomReceiver = Math.floor(Math.random() * 2);
    const randomMeal = Math.floor(Math.random() * 3);
    const randomCount = Math.floor(Math.random() * 5) + 1;
    const result: {
      receiver: "groom" | "bride";
      name: string;
      meal: "예정" | "불참" | "미정";
      count: number;
    } = {
      receiver: randomReceiver === 0 ? "groom" : "bride",
      name: ("참석자" + (i + 1)) as string,
      meal: randomMeal === 0 ? "예정" : randomMeal === 1 ? "불참" : "미정",
      count: randomCount,
    };
    data.push(result);
  }
  return data;
};

export default function Attendee() {
  const [filter, setFilter] = useState<"all" | "groom" | "bride">("all");
  const [limit, setLimit] = useState(10);
  const [itemOffset, setItemOffset] = useState(0);
  const [list, setList] = useState<
    {
      receiver: "groom" | "bride";
      name: string;
      meal: "예정" | "불참" | "미정";
      count: number;
    }[]
  >([]);

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.id as "all" | "groom" | "bride");
  };

  const onChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  useEffect(() => {
    const result = createData();
    setList(result);
    setItemOffset(result.length);
  }, []);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * limit) % list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>참석의사</div>
        <button>공유링크 복사하기</button>
      </div>
      <div className={styles.status}>
        <div className={styles.statusItem}>
          <div>참석 {27}</div>
          <div>
            신랑 {18} <span style={{ color: "#b1b1b1" }}>|</span> 신부 {10}
          </div>
        </div>
        <div className={styles.statusItem}>
          <div>식사 {26}</div>
          <div>
            안함 {0} <span style={{ color: "#b1b1b1" }}>|</span> 미정 {1}
          </div>
        </div>
      </div>
      <div className={styles.filterContainer}>
        <div>
          <div
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="radio"
              id="all"
              name="all"
              onChange={onChangeFilter}
              checked={filter === "all"}
            />
            <label style={{ marginLeft: "5px" }} htmlFor="all">
              전체
            </label>
          </div>
          <div
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="radio"
              id="groom"
              name="groom"
              onChange={onChangeFilter}
              checked={filter === "groom"}
            />
            <label style={{ marginLeft: "5px" }} htmlFor="groom">
              신랑측
            </label>
          </div>
          <div
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="radio"
              id="bride"
              name="bride"
              onChange={onChangeFilter}
              checked={filter === "bride"}
            />
            <label style={{ marginLeft: "5px" }} htmlFor="bride">
              신부측
            </label>
          </div>
        </div>
        <select
          value={limit}
          onChange={onChangeLimit}
          style={{ marginLeft: "auto", color: "#0000ff" }}
        >
          <option value={10}>10개씩</option>
          <option value={25}>25개씩</option>
          <option value={50}>50개씩</option>
          <option value={100}>100개씩</option>
        </select>
      </div>
      <div
        className={styles.row + " head"}
        style={{ background: "#ebebeb", marginTop: "20px" }}
      >
        <div>참석자</div>
        <div>인원</div>
        <div>식사</div>
        <div>삭제</div>
      </div>
      {list
        .filter((el) => (filter === "all" ? true : filter === el.receiver))
        .slice(0, limit)
        .map((item, index) => (
          <div key={index} className={styles.row}>
            <div style={{ textAlign: "left", paddingLeft: "30px" }}>
              <span
                style={{
                  color: item.receiver === "groom" ? "#94ADCC" : "#D7A6B6",
                  marginRight: "5px",
                  padding: "2px 5px",
                  borderRadius: "1rem",
                  border:
                    "1px solid " +
                    (item.receiver === "groom" ? "#94ADCC" : "#D7A6B6"),
                }}
              >
                {item.receiver === "groom" ? "신랑" : "신부"}
              </span>
              {item.name}
            </div>
            <div>{item.count}명</div>
            <div>{item.meal === "예정" ? <Checked /> : ""}</div>
            <div style={{ cursor: "pointer" }}>
              <Trash />
            </div>
          </div>
        ))}
      <ReactPaginate
        breakLabel={"..."}
        nextLabel={">"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={itemOffset}
        previousLabel={"<"}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
