"use client";

import useNaverMap from "@/app/lib/hooks/useNaverMap";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import React from "react";

const kakaoClickHandler = () => {
  // 모바일 환경인지 확인
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  );

  // 모바일 환경일 경우 카카오맵 실행
  if (isMobile) {
    const kakaoMapUrl = `kakaomap://route?ep=${encodeURIComponent("주소")}`;
    window.location.href = kakaoMapUrl;
  } else {
    // PC 환경에서 처리
    // ...
  }
};

const buttons = [
  {
    img: "kakao.png",
    name: "카카오내비",
    onClick: kakaoClickHandler,
  },
  {
    img: "tmap.png",
    name: "티맵",
    onClick: () => console.log("tmap"),
  },
  {
    img: "naver_map.png",
    name: "네이버맵",
    onClick: () => console.log("naver"),
  },
];

export default function Location({
  location,
  buttonColor,
}: {
  location: string;
  buttonColor: string;
}) {
  const naver: any = useNaverMap();
  const ref = useRef<HTMLDivElement>(null);
  const conRef = useRef<HTMLDivElement>(null);
  const locationInfo = JSON.parse(location);

  useScrollFadeIn(conRef);
  useEffect(() => {
    if (!naver || !ref.current || !locationInfo.address) return;
    const { x, y } = locationInfo;

    const map = new naver.maps.Map(ref.current, {
      center: new naver.maps.LatLng(y, x),
      zoom: 17,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(y, x),
      map: map,
    });
  }, [naver, locationInfo]);

  return (
    <Container ref={conRef} className="con">
      <div
        className="cursive"
        style={{
          fontSize: "2.3rem",
          marginTop: "var(--margin-top)",
          marginBottom: "25px",
          marginLeft: "20px",
        }}
      >
        Location
      </div>
      <CustomDivider style={{ marginTop: "25px" }} />
      <Text className={locationInfo.detail ? "" : "empty"}>
        {locationInfo.detail || "ex) 로즈레터 호텔 10층 그랜드홀"}
      </Text>
      <CustomDivider style={{ marginTop: "25px" }} />
      <Text className={locationInfo.address ? "" : "empty"}>
        {locationInfo.address || "ex) 서울시 서초구 로즈로"}
      </Text>
      {locationInfo.phone && (
        <Text style={{ marginTop: "10px" }}>
          {"Tel. " + (locationInfo.phone || "ex) 02-000-000")}
        </Text>
      )}
      <MapContainer ref={ref} />
      <ButtonContainer color={buttonColor}>
        {buttons.map((info) => (
          <Button key={info.name} onClick={info.onClick}>
            <Icon img={info.img} />
            <span>{info.name}</span>
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
}

const ButtonContainer = styled.div<{ color: string }>`
  width: 90%;
  height: 40px;
  border-radius: 0.8rem;
  border: 1px solid rgba(129, 122, 94, 0.3);
  background: ${({ color }) => color};
  margin: 0 auto;
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #817a5e;
  font-size: 0.9rem;
  position: relative;
  width: 30%;

  &:first-of-type,
  &:nth-of-type(2) {
    &::after {
      content: "";
      display: block;
      position: absolute;
      right: -12px;
      width: 1px;
      height: 20px;
      border-right: 1px solid rgba(129, 122, 94, 0.3);
    }
  }
`;

const Icon = styled.div<{ img: string }>`
  width: 17px;
  height: 17px;
  background-image: ${({ img }) => `url(${img})`};
  background-size: 17px 17px;
  background-position: center 0.5px;
  background-repeat: no-repeat;
  margin-right: 8px;
`;

const MapContainer = styled.div`
  width: 90%;
  height: 320px;
  margin: 0 auto;
  margin-top: 25px;
  background: lightgray;
  border-radius: 0.3rem;
  border: 1px solid lightgray;
`;
const Text = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-top: 25px;
  width: 80%;
  word-break: keep-all;

  &.empty {
    color: var(--gray-color);
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 25px;
`;

const CustomDivider = styled.div`
  width: 80%;
  height: 1px;
  background: #817a5e4d;
  margin: 0 auto;
  margin-top: var(--margin-top);
`;
