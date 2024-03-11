"use client";

import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIN";
import styled from "@emotion/styled";
import React, { useRef } from "react";

const data = [
  {
    name: "이지은",
    date: "2021-08-01",
    content: "결혼 축하해!! 둘이 너무 잘 어울리고 예쁘다 ~ 행복하게 잘 살아!",
  },
  {
    name: "이지은",
    date: "2021-08-01",
    content:
      "결혼 축하해!! 둘이 너무 잘 어울리고 예쁘다 ~ 행복하게 잘 살아!ewrjer2i3jro23rjoeiwjroiwejreiowjrwdsfnkdf",
  },
];

export default function GuestBook() {
  const conRef = useRef<HTMLFieldSetElement>(null);
  useScrollFadeIn(conRef);

  return (
    <Container ref={conRef} className="con">
      <legend>방명록</legend>
      <EditButton />
      {data.map((info, index) => (
        <GuestBookInfo key={index}>
          <Title>
            <Name>{info.name}</Name>
            <RightInfo>
              <DateInfo>{info.date}</DateInfo>
              <Close>×</Close>
            </RightInfo>
          </Title>
          <Content>{info.content}</Content>
        </GuestBookInfo>
      ))}
      <Button>더보기</Button>
    </Container>
  );
}

const GuestBookInfo = styled.div`
  background: #f5e3e24d;
  border-radius: 4px;
  width: 100%;
  height: 108px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  justify-content: space-between;
  padding: 10px;
`;

const RightInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  font-weight: bold;
`;

const DateInfo = styled.div`
  font-size: 0.9rem;
  color: #817a5e;
`;

const Close = styled.button`
  outline: none;
  border: none;
  color: #817a5e;
  background: none;
  font-size: 1.8rem;
  cursor: pointer;
  margin-left: 15px;
  line-height: 1rem;
`;

const Content = styled.p`
  width: 100%;
  height: 800px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 원하는 줄 수 설정 */
  -webkit-box-orient: vertical;
  text-align: left;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  margin-top: 25px;
`;

const EditButton = styled.button`
  width: 50px;
  height: 33px;
  border: 1px solid rgba(129, 122, 94, 0.3);
  background: #f5e3e2;
  border-radius: 5px;
  background-image: url("edit.png");
  background-repeat: no-repeat;
  background-size: 15px 15px;
  background-position: center center;
  display: block;
  margin: 25px 0;
`;

const Container = styled.fieldset`
  width: 90%;
  margin: 0 auto;
  margin-top: var(--margin-top);
  box-sizing: border-box;
  font-size: 0.9rem;

  border: none;
  border-top: 1px solid rgba(129, 122, 94, 0.3);

  & > legend {
    text-align: center;
    padding: 0 15px;
    font-weight: bold;
  }
`;

const Button = styled.button`
  width: 274px;
  height: 36px;
  border-radius: 28px;
  border: 1px solid rgba(129, 122, 94, 0.3);
  background: #f5e3e2;
  cursor: pointer;
  margin-top: 25px;
`;
