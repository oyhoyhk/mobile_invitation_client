"use client";

import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";
import styled from "@emotion/styled";
import React, { useRef } from "react";

export default function Attendance({
  attendanceMessage,
}: {
  attendanceMessage: string;
}) {
  const conRef = useRef<HTMLFieldSetElement>(null);
  useScrollFadeIn(conRef);

  return (
    <Container ref={conRef} className="con">
      <legend>참석의사 전달하기</legend>
      <p>{attendanceMessage}</p>
      <Button>참석의사 전달하기</Button>
    </Container>
  );
}

const Button = styled.button`
  border: 1px solid rgba(129, 122, 94, 0.3);
  background: #f5e3e2;
  border-radius: 28px;
  height: 36px;
  width: 274px;
  cursor: pointer;
  margin-top: 25px;
`;

const Container = styled.fieldset`
  width: 85%;
  margin: 0 auto;
  margin-top: var(--margin-top);
  box-sizing: border-box;
  font-size: 0.9rem;

  border-radius: 0.5rem;
  border: 1px solid rgba(129, 122, 94, 0.3);
  padding: 50px 25px;

  & > legend {
    text-align: center;
    padding: 0 15px;
    font-weight: bold;
  }

  & > p {
    white-space: pre-line;
    line-height: 26px;
    font-size: 14px;

    &.empty {
      color: var(--gray-color);
    }
  }
`;
