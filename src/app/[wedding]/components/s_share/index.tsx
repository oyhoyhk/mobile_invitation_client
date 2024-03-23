import useKakao from "@/app/lib/hooks/useKakao";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

export default function ShareButton({
  data,
  color,
}: {
  data: any;
  color: string;
}) {
  const kakao: any = useKakao();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!kakao || !data) return;
    const name = JSON.parse(data.name);
    const photo = data.images.filter((el: any) =>
      el.url.includes("finalPhoto")
    )[0].url;
    kakao.init("14dbd850d88a95cc04984112df3658ad");

    // SDK 초기화 여부를 판단합니다.
    if (ref.current) {
      ref.current.addEventListener("click", kakaoShare);
      return () => {
        ref.current?.removeEventListener("click", kakaoShare);
      };
    }

    function kakaoShare() {
      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: `${name.groom}❤️${name.bride} 결혼합니다!`,
          description: data.firstDescription,
          imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL + photo,
          link: {
            mobileWebUrl: `${process.env.NEXT_PUBLIC_SHARE_URL}${data.id}`,
            webUrl: `${process.env.NEXT_PUBLIC_SHARE_URL}${data.id}`,
          },
        },
        buttons: [
          {
            title: "축하해주러 가기기",
            link: {
              mobileWebUrl: `${process.env.NEXT_PUBLIC_SHARE_URL}${data.id}`,
              webUrl: `${process.env.NEXT_PUBLIC_SHARE_URL}${data.id}`,
            },
          },
        ],
        // 카카오톡 미설치 시 카카오톡 설치 경로이동
        installTalk: true,
      });
    }
  }, [kakao, data]);

  return (
    <Button ref={ref} style={{ background: color }}>
      공유하기
    </Button>
  );
}

const Button = styled.button`
  width: 333px;
  height: 36px;
  border-radius: 28px;
  border: 1px solid rgba(129, 122, 94, 0.3);
  margin-top: var(--margin-top);
  cursor: pointer;
  color: black;
`;
