import { RefObject, useEffect } from "react";

export default function useScrollFadeIn(
  conRef: RefObject<HTMLDivElement> | RefObject<HTMLFieldSetElement>
) {
  useEffect(() => {
    if (!conRef.current) return;
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // 50%가 viewport에 들어와 있어야 callback 실행
    };

    // new IntersectionObserver객체의 콜백함수를 인자로 줍니다.
    // 이때 entries는 스크롤 이벤트를 적용할 모든 dom 객체입니다.

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 해당 dom이 교차영역에 진입 시 적용하고 싶은 로직 작성
        if (entry.isIntersecting) {
          entry.target.classList.add("mount");
        }
      });
    }, options);

    observer.observe(conRef.current);
  }, []);
}
