import { alarmState } from "@/app/lib/atom";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

export default function Alarm() {
  const [alarmInfo, setAlarmInfo] = useRecoilState(alarmState);
  const conRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!alarmInfo) return;
    conRef.current?.classList.add("show");
    setTimeout(() => {
      conRef.current?.classList.remove("show");
      setAlarmInfo(null);
    }, 2000);
  }, []);
  if (!alarmInfo) return null;
  return (
    <Container ref={conRef} type={alarmInfo.type}>
      {alarmInfo.message}
    </Container>
  );
}

const Container = styled.div<{ type: "success" | "error" }>`
  position: fixed;
  bottom: 10%;
  left: 50%;
  border-radius: 0.6rem;
  padding: 10px 15px;
  border: 1px solid ${(props) => (props.type === "success" ? "green" : "red")};
  background-color: ${(props) =>
    props.type === "success" ? "lightgreen" : "pink"};
  color: black;
  transition: 0.5s;
  z-index: 100;
  opacity: 0;
  transform: translateX(-50%) translateY(20px);

  &.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;
