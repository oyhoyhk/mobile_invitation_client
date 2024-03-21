import { atom } from "recoil";

export const galleryState = atom<{
  cur: number;
  list: string[];
} | null>({
  key: "galleryState",
  default: null,
});

export const alarmState = atom<{
  type: "success" | "error";
  message: string;
} | null>({
  key: "alarmState",
  default: null,
});
