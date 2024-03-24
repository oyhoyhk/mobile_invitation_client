"use client";

import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import { hexToRgba } from "@/app/lib/hexToRgba";
import { useSetRecoilState } from "recoil";
import { alarmState } from "@/app/lib/atom";

export default function GuestBook({
  id,
  buttonColor,
}: {
  id: string;
  buttonColor: string;
}) {
  const conRef = useRef<HTMLFieldSetElement>(null);
  useScrollFadeIn(conRef);

  const [toggle, setToggle] = useState(false);
  const [deleteModal, setDeleteModal] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const setAlarm = useSetRecoilState(alarmState);

  const [list, setList] = useState<
    { idx: number; name: string; createdAt: string; title: string }[]
  >([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_IMAGE_URL}api/guestbook?id=${id}&page=${pageCount}`
    )
      .then((res) => res.json())
      .then((res) => {
        setList((prev) => [...res.guestBooks]);
        setTotalLength(res.totalLength);
      })
      .catch(() => {
        setAlarm({
          type: "error",
          message: "방명록을 불러오는데 실패했습니다",
        });
      });
  }, [pageCount]);

  return (
    <Container ref={conRef} className="con">
      <legend>방명록</legend>
      <EditButton color={buttonColor} onClick={() => setToggle(true)} />
      {list.map((info, index) => (
        <GuestBookInfo key={index} color={hexToRgba(buttonColor, 0.5)}>
          <Title>
            <Name>{info.name}</Name>
            <RightInfo>
              <DateInfo>{info.createdAt.slice(0, 10)}</DateInfo>
              <Close onClick={() => setDeleteModal(info.idx)}>×</Close>
            </RightInfo>
          </Title>
          <Content>{info.title}</Content>
        </GuestBookInfo>
      ))}
      {list.length === 0 && (
        <p style={{ marginTop: "100px" }}>따뜻한 마음을 전해주세요</p>
      )}
      {list.length < totalLength && (
        <Button
          style={{ background: buttonColor }}
          onClick={() => setPageCount((prev) => prev + 1)}
        >
          더보기
        </Button>
      )}
      {toggle && (
        <Modal
          id={id}
          setToggle={setToggle}
          setList={setList}
          setPage={setPageCount}
          setTotalLength={setTotalLength}
          buttonColor={buttonColor}
        />
      )}
      {deleteModal && (
        <DeleteModal
          id={id}
          idx={deleteModal}
          setList={setList}
          setPage={setPageCount}
          setTotalLength={setTotalLength}
          buttonColor={buttonColor}
          setDeleteModal={setDeleteModal}
        />
      )}
    </Container>
  );
}

const GuestBookInfo = styled.div<{ color: string }>`
  background: ${({ color }) => color};
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
  font-size: 16px;
  color: #817a5e;
`;

const Close = styled.button`
  outline: none;
  border: none;
  color: #817a5e;
  background: none;
  font-size: 1.9rem;
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

const EditButton = styled.button<{ color: string }>`
  width: 50px;
  height: 33px;
  border: 1px solid rgba(129, 122, 94, 0.3);
  background: ${({ color }) => color};
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
  min-height: 250px;
  margin-top: 115px;
  box-sizing: border-box;
  font-size: 16px;

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
