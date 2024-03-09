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

async function getData(id: string) {
  const response = await fetch(`http://localhost:4000/api/wedding/${id}`);
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
  console.log(images);
  console.log(data);
  return (
    <div className={styles.container} style={{ background: data.themeColor }}>
      <Header />
      <Name name={data.name} />
      <ClippedImage
        src={
          images.filter((image: string) => image.includes("clippedImage"))[0]
        }
      />
      <Info info={data.weddingInfo} />
      <FirstDescription description={data.firstDescription} />
      <MainPhoto
        src={images.filter((image: string) => image.includes("mainPhoto"))[0]}
      />
      <div
        className="cursive"
        style={{ fontSize: "2.5rem", marginTop: "var(--margin-top)" }}
      >
        Invite you
      </div>
      <div style={{ marginTop: "25px" }}>소중한 분들을 초대합니다</div>
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
      <div
        className="cursive"
        style={{ fontSize: "2.5rem", marginTop: "var(--margin-top)" }}
      >
        Our Day
      </div>
      <Calendar dateString={data.date} />
      <div
        className="cursive"
        style={{ fontSize: "2.5rem", marginTop: "var(--margin-top)" }}
      >
        Gallery
      </div>
      <Gallery
        images={images.filter((image: string) => image.includes("gallery"))}
      />
      <div
        className="cursive"
        style={{ fontSize: "2.5rem", marginTop: "var(--margin-top)" }}
      >
        Location
      </div>
      <Location location={data.locationInfo} />
      <Transportation transportation={data.transportInfo} />
      <Pigeon
        style={{
          margin: "var(--margin-top) auto 0 auto",
        }}
      />
      <AccountInfo account={data.accountInfo} />
      <Attendance attendanceMessage={data.attendanceMessage} />
      <GuestBook />
      <FinalPhoto
        src={images.filter((image: string) => image.includes("finalPhoto"))[0]}
        finalPhotoColor={data.finalPhotoColor}
        finalPhotoText={data.finalPhotoText}
      />
      <button className={styles.button}>공유하기</button>
      <Footer />
    </div>
  );
}
