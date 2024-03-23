"use client";

import Image from "next/image";
import styles from "./gallery.module.css";
import { useRef } from "react";
import useScrollFadeIn from "@/app/lib/hooks/useScrollFadeIn";
import { useSetRecoilState } from "recoil";
import { galleryState } from "@/app/lib/atom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { DragDealer } from "./DragDealer";
import "react-horizontal-scrolling-menu/dist/styles.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  ev.stopPropagation();
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  if (isThouchpad) {
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

export default function Gallery({ images }: { images: string[] }) {
  const setGalleryInfo = useSetRecoilState(galleryState);
  const conRef = useRef<HTMLDivElement>(null);
  useScrollFadeIn(conRef);

  const serverUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  const imagesList = [];
  const N = Math.ceil(images.length / 2);
  for (let i = 0; i < N; i++) {
    if (images[i + N]) {
      imagesList.push([
        { src: images[i], index: i },
        { src: images[i + N], index: i + N },
      ]);
    } else {
      imagesList.push([{ src: images[i], index: i }]);
    }
  }
  const parentRef = useRef<HTMLDivElement>(null);
  const clickImage = (idx: number) => {
    setGalleryInfo(() => idx);
  };

  const dragState = useRef(new DragDealer());

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragState.current.dragMove(ev, (posDiff: number) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <div className={styles.container + " con"} ref={conRef}>
      <div
        className="cursive"
        style={{
          fontSize: "2.3rem",
          marginTop: "var(--margin-top)",
          marginLeft: "20px",
          marginBottom: "50px",
        }}
      >
        Gallery
      </div>
      <div
        ref={parentRef}
        className={styles.wrapper}
        onMouseLeave={dragState.current.dragStop}
      >
        <ScrollMenu
          onWheel={onWheel}
          onMouseDown={() => dragState.current.dragStart}
          onMouseUp={() => dragState.current.dragStop}
          onMouseMove={handleDrag}
        >
          {imagesList.map((list, idx) => (
            <div className={styles.imageContainer} key={"imageContainer" + idx}>
              {list.map((image, imageIdx) => (
                <Image
                  src={serverUrl + image.src}
                  key={`image-${idx}-${imageIdx}`}
                  onClick={() => clickImage(image.index)}
                  alt="gallery"
                  sizes="100vw"
                  width={0}
                  height={0}
                />
              ))}
            </div>
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
}
