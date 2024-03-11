"use client";

import styled from "@emotion/styled";
import React from "react";
import Arrow from "../../../../assets/arrowDown.svg";

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
      <Button>
        <div />
        신랑측 계좌번호
        <Arrow />
      </Button>
      <AccountContainer>
        {accountInfo.list
          .filter((el: any) => el.type === "groom")
          .map((el: any) => (
            <Account key={el.accountNumber}>
              <div>
                <div>
                  <span>{el.bank}</span>
                  <span>{el.accountNumber}</span>
                </div>
                <div>
                  <span>{el.accountHolder}</span>
                </div>
              </div>
              <button>복사하기</button>
            </Account>
          ))}
      </AccountContainer>
      <Button>
        <div />
        신부측 계좌번호 <Arrow />
      </Button>
      <AccountContainer>
        {accountInfo.list
          .filter((el: any) => el.type === "bride")
          .map((el: any) => (
            <Account key={el.accountNumbAer}>
              <div>
                <div>
                  <span>{el.bank}</span>
                  <span>{el.accountNumber}</span>
                </div>
                <div>
                  <span>{el.accountHolder}</span>
                </div>
              </div>
              <button>복사하기</button>
            </Account>
          ))}
      </AccountContainer>
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
  justify-content: space-between;
  background: #f5e3e2;
  border-radius: 0.5rem;
  width: 100%;
  height: 50px;
  margin-top: 25px;
  cursor: pointer;
  padding: 0 20px;
`;

const AccountContainer = styled.div`
  width: 100%;
  background: #f8ece8;
  border-radius: 8px;
`;

const Account = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 90%;
    border: 1px solid #817a5e4d;
    transform: translateX(-50%);
  }
  &:last-of-type {
    &::after {
      display: none;
    }
  }

  & > div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    & > div:first-of-type {
      margin-bottom: 15px;
    }
  }

  & button {
    border-radius: 8px;
    background-color: #f5e3e2;
    border: 1px solid #817a5e4d;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: var(--margin-top);
`;
