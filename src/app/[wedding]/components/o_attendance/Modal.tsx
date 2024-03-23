import { alarmState } from "@/app/lib/atom";
import { hexToRgba } from "@/app/lib/hexToRgba";
import styled from "@emotion/styled";
import { MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

export default function Modal({
  id,
  color,
  setToggle,
}: {
  id: string;
  color: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const setAlarm = useSetRecoilState(alarmState);
  const [receiver, setReceiver] = useState<"groom" | "bride" | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      tel: { value: string };
      memo: { value: string };
      meal: { value: string };
      count: { value: number };
    };

    if (
      !receiver ||
      !target.name.value ||
      !target.tel.value ||
      !target.meal.value ||
      !target.count.value
    ) {
      setAlarm({ type: "error", message: "모든 항목을 입력해주세요" });
      return;
    }

    const name = target.name.value;
    const tel = target.tel.value;
    const memo = target.memo.value;
    const meal = target.meal.value;
    const count = target.count.value;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}api/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          receiver,
          name,
          tel,
          memo,
          meal,
          count,
        }),
      });
      setAlarm({ type: "success", message: "전달되었습니다" });
    } catch (e) {
      setAlarm({ type: "error", message: "전달에 실패했습니다" });
    } finally {
      setToggle(false);
    }
  };
  return (
    <Container onSubmit={onSubmit}>
      <Header>
        <div />
        <div>참석의사 전달하기</div>
        <div onClick={() => setToggle(false)}>×</div>
      </Header>
      <InputContainer>
        <label>구분</label>
        <div>
          <div
            style={{
              background:
                receiver === "groom" ? hexToRgba(color, 0.5) : "white",
            }}
            onClick={() => setReceiver("groom")}
          >
            신랑
          </div>
          <div
            style={{
              background:
                receiver === "bride" ? hexToRgba(color, 0.5) : "white",
            }}
            onClick={() => setReceiver("bride")}
          >
            신부
          </div>
        </div>
      </InputContainer>
      <InputContainer>
        <label htmlFor="attendance_name">성함</label>
        <input placeholder="출석자 성함" name="name" id="attendance_name" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="attendance_tel">전화번호</label>
        <input placeholder="끝 4자리" name="tel" id="attendance_tel" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="attendance_memo">메모</label>
        <input name="memo" id="attendance_memo" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="attendance_meal">식사</label>
        <div className="radios">
          <input
            type="radio"
            name="meal"
            id="attendance_undefined"
            value="미정"
          />
          <label htmlFor="attendance_undefined">미정</label>
          <input
            type="radio"
            name="meal"
            id="attendance_expected"
            value="예정"
          />
          <label htmlFor="attendance_expected">예정</label>
          <input
            type="radio"
            name="meal"
            id="attendance_noappearance"
            value="불참"
          />
          <label htmlFor="attendance_noappearance">불참</label>
        </div>
      </InputContainer>
      <SelectContainer>
        <label htmlFor="attendance_count">참석인원</label>
        <Select
          defaultValue={1}
          sx={{
            width: "75%",
            height: "33px",
            border: "1px solid #817a5e4d",
            textAlign: "center",
            borderRadius: "8px",
            padding: "8px 16px",
            outline: "none",
          }}
          name="count"
          id="attendance_count"
        >
          <MenuItem value={1}>1명 (본인 포함)</MenuItem>
          <MenuItem value={2}>2명 (본인 포함)</MenuItem>
          <MenuItem value={3}>3명 (본인 포함)</MenuItem>
          <MenuItem value={4}>4명 (본인 포함)</MenuItem>
          <MenuItem value={5}>5명 (본인 포함)</MenuItem>
        </Select>
      </SelectContainer>
      <Button style={{ background: color }}>전달하기</Button>
    </Container>
  );
}

const SelectContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  font-family: "MaruBuri-Regular", "Inter", serif;
  font-size: 0.9rem;

  & div {
    font-size: 0.9rem;
  }

  & > div {
    border: 1px solid #817a5e4d !important;

    outline: none !important;
    &:focus,
    &:hover {
      border: 1px solid #817a5e4d !important;
      outline: none !important;
    }
  }
  & fieldset {
    border: none;
    outline: None;
  }

  & svg path {
    fill: #817a5e4d;
  }
`;

const InputContainer = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  & > div {
    width: 75%;
    display: flex;
    justify-content: space-between;

    & > div {
      border-radius: 8px;
      background: white;
      border: 1px solid #817a5e4d;
      width: 90px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &.selected {
        background: #f5e3e280;
      }
    }
  }
  & > input {
    width: 75%;
    border: 1px solid #817a5e4d;
    text-align: center;
    border-radius: 8px;
    padding: 8px 16px;
    outline: none;
    &::placeholder {
      text-align: center;
    }

    &#attendance_count {
      text-align: left;
      padding-left: 20px !important;
      &::placeholder {
        text-align: left;
      }
    }
  }
`;

const Button = styled.button`
  border: 1px solid #817a5e4d;
  background: #f5e3e2;
  width: 274px;
  border-radius: 28px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 25px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border: 0.7px solid #817a5e4d;
  margin-bottom: 10px;

  & > div:nth-of-type(2) {
    font-weight: 700;
    font-size: 16px;
  }
  & > div:first-of-type {
    width: 12px;
  }
  & > div:last-of-type {
    font-size: 30px;
    cursor: pointer;
  }
`;

const Container = styled.form`
  width: 310px;
  height: 465px;
  box-shadow: 0px 1px 10px 0px #0000001f;

  box-shadow: 0px 4px 5px 0px #00000024;

  box-shadow: 0px 2px 4px -1px #00000033;

  position: fixed;
  left: 50%;
  top: 50%;
  background: white;
  transform: translate(-50%, -50%);
  z-index: 4;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
