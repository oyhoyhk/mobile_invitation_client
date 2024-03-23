"use client";

import Header from "./components/a_header";
import Name from "./components/b_name";
import ClippedImage from "./components/c_clippedImage";
import Info from "./components/d_info";
import FirstDescription from "./components/e_firstDescription";
import MainPhoto from "./components/f_mainPhoto";
import SecondDescription from "./components/g_secondDescription";
import Family from "./components/h_family";
import TwoPhotos from "./components/i_twoPhotos";
import Calendar from "./components/j_calendar";
import Gallery from "./components/k_gallery";
import Location from "./components/l_location";
import Transportation from "./components/m_transportation";
import AccountInfo from "./components/n_accountInfo";
import styles from "./page.module.css";
import Pigeon from "../../assets/pigeon.svg";
import Candle from "../../assets/candle.svg";
import Attendance from "./components/o_attendance";
import GuestBook from "./components/p_guestBook";
import FinalPhoto from "./components/q_finalPhoto";
import Footer from "./components/r_footer";
import { hexToRgba } from "../lib/hexToRgba";
import { RecoilRoot, useRecoilValue } from "recoil";
import { alarmState, galleryState } from "../lib/atom";
import GalleryExtension from "./components/z_etc/GalleryExtension";
import { useEffect, useState } from "react";
import Alarm from "./components/z_etc/Alarm";
import ShareButton from "./components/s_share";

export default function Slug({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id;

  const [data, setData] = useState<any>(null);
  const galleryInfo = useRecoilValue(galleryState);
  const alarm = useRecoilValue(alarmState);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_IMAGE_URL}api/wedding/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [id]);

  if (data === null) return <div>loading...</div>;

  const images = data.images.map((image: { url: string }) => image.url);
  const { color, opacity } = JSON.parse(data.heartInfo);

  return (
    <div className={styles.container} style={{ background: data.themeColor }}>
      <Header />
      <Name name={data.name} />
      <ClippedImage
        color={data.themeColor}
        src={
          images.filter((image: string) => image.includes("clippedImage"))[0]
        }
      />
      <Info info={data.weddingInfo} />
      <Candle
        style={{
          margin: "var(--margin-top) auto 25px auto",
          width: "48px",
          height: "55px",
        }}
      />
      <FirstDescription description={data.firstDescription} />
      <MainPhoto
        src={images.filter((image: string) => image.includes("mainPhoto"))[0]}
      />

      <SecondDescription description={data.secondDescription} />
      <div
        style={{
          width: "80%",
          height: "1px",
          background: "#817a5e4d",
          margin: "0 auto",
          marginTop: "var(--margin-top)",
        }}
      />
      <Family family={data.familyInfo} name={data.name} />
      <div
        style={{
          width: "80%",
          height: "1px",
          background: "#817a5e4d",
          margin: "0 auto",
          marginTop: "var(--margin-top)",
        }}
      />
      <TwoPhotos
        urls={images.filter((image: string) => image.includes("twoPhoto"))}
      />

      <Calendar
        dateString={data.date}
        color={hexToRgba(color, Number(opacity))}
      />

      <Gallery
        images={images.filter((image: string) => image.includes("gallery"))}
      />

      <Location location={data.locationInfo} buttonColor={data.buttonColor} />
      <Transportation transportation={data.transportInfo} />
      <Pigeon
        style={{
          margin: "var(--margin-top) auto 0 auto",
        }}
      />
      <AccountInfo account={data.accountInfo} buttonColor={data.buttonColor} />
      <Attendance
        buttonColor={data.buttonColor}
        attendanceMessage={data.attendanceMessage}
      />
      <GuestBook buttonColor={data.buttonColor} id={id} />
      <FinalPhoto
        src={images.filter((image: string) => image.includes("finalPhoto"))[0]}
        finalPhotoColor={data.finalPhotoColor}
        finalPhotoText={data.finalPhotoText}
      />
      <ShareButton data={data} color={data.buttonColor} />
      <Footer />
      {galleryInfo !== null && (
        <GalleryExtension
          list={images.filter((image: string) => image.includes("gallery"))}
        />
      )}
      {alarm && <Alarm color={data.buttonColor} />}
    </div>
  );
}
