import styled from "@emotion/styled";
import React, { useState } from "react";

export default function Modal({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [receiver, setReceiver] = useState<"groom" | "bride" | null>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      tel: { value: string };
      memo: { value: string };
      meal: { value: string };
      count: { value: string };
    };

    if (
      !receiver ||
      !target.name.value ||
      !target.tel.value ||
      !target.meal.value ||
      !target.count.value
    ) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    const name = target.name.value;
    const tel = target.tel.value;
    const memo = target.memo.value;
    const meal = target.meal.value;
    const count = target.count.value;

    await fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}api/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiver,
        name,
        tel,
        memo,
        meal,
        count,
      }),
    });
    setToggle(false);
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
            className={receiver === "groom" ? "selected" : ""}
            onClick={() => setReceiver("groom")}
          >
            신랑
          </div>
          <div
            className={receiver === "bride" ? "selected" : ""}
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
        <div>
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
      <InputContainer>
        <label htmlFor="attendance_count">참석인원</label>
        <input
          type="text"
          name="count"
          maxLength={11}
          id="attendance_count"
          placeholder="총 1명 (본인포함)"
        />
      </InputContainer>
      <Button>전달하기</Button>
    </Container>
  );
}

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
