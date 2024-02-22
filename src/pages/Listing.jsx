import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db } from "../firebase";
import { getDoc } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";

import Spinner from "../components/Spinner";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
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
    </main>
  );
};
export default Listing;
