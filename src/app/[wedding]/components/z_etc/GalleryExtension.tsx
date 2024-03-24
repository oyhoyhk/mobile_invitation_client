"use client";

import { galleryState } from "@/app/lib/atom";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import Slider from "react-slick";
import styled from "@emotion/styled";
import "./slick.css";
import "./slick-theme.css";
import Arrow from "../../../../assets/arrow.svg";
import Close from "../../../../assets/close.svg";

export default function GalleryExtension({ list }: { list: any[] }) {
  const [galleryInfo, setGalleryInfo] = useRecoilState(galleryState);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: galleryInfo as number,
    afterChange: function (index: number) {
      setGalleryInfo(index);
    },
  };
  const conRef = useRef<HTMLDivElement>(null);
  let sliderRef = useRef<any>(null);

  useEffect(() => {
    if (conRef.current) {
      conRef.current.addEventListener("wheel", (e) => {
        e.preventDefault();
      });
    }
  }, []);

  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.current.slickPrev();
  };
  return (
    <Container ref={conRef}>
      <Slider
        ref={(slider) => {
          sliderRef.current = slider;
        }}
        {...settings}
      >
        {list.map((el, idx) => (
          <Wrapper key={idx}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${el}`}
              alt={"gallery"}
              sizes={"100vw"}
              width={0}
              height={0}
              onClick={() => setGalleryInfo(idx)}
            />
          </Wrapper>
        ))}
      </Slider>
      <Status>
        {(galleryInfo as number) + 1} / {list.length}
      </Status>
      <Arrow
        onClick={previous}
        style={{
          position: "fixed",
          left: "3%",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
      />
      <Arrow
        onClick={next}
        style={{
          position: "fixed",
          right: "3%",
          top: "50%",
          transform: "translateY(-50%)  rotate(180deg)",
          cursor: "pointer",
        }}
      />
      <Close
        style={{
          position: "fixed",
          top: "3%",
          right: "3%",
          cursor: "pointer",
        }}
        onClick={() => setGalleryInfo(null)}
      />
    </Container>
  );
}

const Status = styled.div`
  position: fixed;
  left: 3%;
  top: 3%;
  color: white;
  font-size: 25px;
  font-weight: 700;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  display: block;
  z-index: 99;
`;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  border: none;
  & > img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 375px;
    height: auto;
  }
`;
