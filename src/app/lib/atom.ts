import { atom } from "recoil";

export const galleryState = atom<{
  cur: number;
  list: string[];
} | null>({
  key: "galleryState",
  default: null,
});
