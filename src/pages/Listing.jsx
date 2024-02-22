import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "../firebase";
import { getDoc } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaShare } from "react-icons/fa";

import Spinner from "../components/Spinner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) return <Spinner />;

  return (
    <main>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        slidesPerView={1}
        navigation={true}
        pagination={{ type: "progressbar" }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
              className="relative w-full overflow-hidden h-[300px] "
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center" onClick={()=>{
    navigator.clipboard.writeText(window.location.href)
    setShareLinkCopied(true)
    setTimeout(()=> {
        setShareLinkCopied(false)
    }, 2000)
    }}
    >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopied && <p className="fixed top-[22%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2 cursor-pointer">Link Copied</p> }
    </main>
  );
};
export default Listing;
