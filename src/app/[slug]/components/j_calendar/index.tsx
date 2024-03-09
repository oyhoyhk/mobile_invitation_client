import styles from "./calendar.module.css";
import HeartSVG from "../../../../assets/heart.svg";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({ dateString }: { dateString: string }) {
  const date = new Date(dateString);
  const color = "pink";
  const opacity = "1";

  console.log(date);

  // 년도와 월을 추출합니다.
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 해당 월의 첫 날을 구합니다.
  const firstDayOfMonth = new Date(year, month - 1, 1);

  // 해당 월의 일 수를 구합니다.
  const lastDayOfMonth = new Date(year, month, 0);
  const numberOfDaysInMonth = lastDayOfMonth.getDate();

  // 첫 날의 요일을 구합니다.
  const firstDayOfWeekIndex = firstDayOfMonth.getDay();

  // 첫 날 이전의 공백을 채워주기 위해 빈 요소를 생성합니다.
  const emptyDays = [...Array(firstDayOfWeekIndex).keys()];

  return (
    <div className={styles.container}>
      {days.map((day) => (
        <div key={day} className={styles.dayName}>
          {day}
        </div>
      ))}
      {emptyDays.map((_, index) => (
        <div key={`empty-${index}`} className={styles.empty}></div>
      ))}
      {Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1).map(
        (date) => (
          <div key={`date-${date}`} className={styles.date}>
            {dateString && date === day && <HeartSVG />}
            {<div className={styles.dateValue}>{date}</div>}
          </div>
        )
      )}
    </div>
  );
}
