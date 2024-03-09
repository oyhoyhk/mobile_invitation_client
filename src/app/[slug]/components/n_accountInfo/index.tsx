"use client";

import styled from "@emotion/styled";
import React from "react";

export default function AccountInfo({ account }: { account: string }) {
  const accountInfo = JSON.parse(account);
  console.log(accountInfo);
  return (
    <Container>
      <SubTitle>•마음 전하실 곳•</SubTitle>
      <Annoucement>
        {accountInfo.message ||
          `참석이 어려우신 분들을 위해
  계좌번호를 기재하였습니다.
  너그러운 마음으로 양해 부탁드립니다.`}
      </Annoucement>
      <Button>신랑측 계좌번호</Button>
      <Button>신부측 계좌번호</Button>
    </Container>
  );
}

const SubTitle = styled.div`
  font-size: 12px;
  margin-top: var(--margin-top);
`;
const Annoucement = styled.div`
  margin-top: 25px;
  text-align: center;
  white-space: pre-line;
  line-height: 26px;
  margin-bottom: var(--margin-top);
  font-size: 14px;

  &.empty {
    color: var(--gray-color);
  }
`;
const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5e3e2;
  border-radius: 0.5rem;
  width: 100%;
  height: 50px;
  margin-bottom: 25px;
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: var(--margin-top);
`;
