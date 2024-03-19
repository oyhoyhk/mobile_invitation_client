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
import Attendance from "./components/o_attendance";
import GuestBook from "./components/p_guestBook";
import FinalPhoto from "./components/q_finalPhoto";
import Footer from "./components/r_footer";
import { hexToRgba } from "../lib/hexToRgba";
import { useRecoilValue } from "recoil";
import { galleryState } from "../lib/atom";
import GalleryExtension from "./components/z_etc/GalleryExtension";

async function getData(id: string) {
  const response = await fetch(`${process.env.IMAGE_URL}api/wedding/${id}`);
  return response.json();
}

export default async function Slug({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id;
  const data = await getData(id);
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
      <FirstDescription description={data.firstDescription} />
      <MainPhoto
        src={images.filter((image: string) => image.includes("mainPhoto"))[0]}
      />

      <SecondDescription description={data.secondDescription} />
      <div
        style={{
          width: "80%",
          height: "1px",
          background: "lightgray",
          margin: "0 auto",
          marginTop: "var(--margin-top)",
        }}
      />
      <Family family={data.familyInfo} name={data.name} />
      <div
        style={{
          width: "80%",
          height: "1px",
          background: "lightgray",
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
      <button
        style={{ background: data.buttonColor }}
        className={styles.button}
      >
        공유하기
      </button>
      <Footer />
    </div>
  );
}
