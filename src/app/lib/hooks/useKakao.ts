import { useEffect, useState } from "react";

declare global {
  interface Window {
    Kakao: unknown;
  }
}

export default function useKakao() {
  const [kakao, setKakao] = useState<unknown>(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      initMap();
    };

    function initMap() {
      setKakao(window.Kakao || null);
    }
  }, []);

  return kakao;
}
