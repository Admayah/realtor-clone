import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";

import Spinner from "./Spinner";
import { db } from "../firebase";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      console.log(listings, "mmmm");
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
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
          {listings.map(({ id, data }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div style={{ background: `url(${data.imgUrls[0]}) center, no-repeat`, backgroundSize: "cover" }} className="relative w-full h-[300px] overflow-hidden"></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">{data.name}</p>
              <p className="text-[#f1faee] absolute left-1 bottom-3 font-semi-medium max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">${data.discountedPrice?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? data.regularPrice?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {data.type === "rent" && " / month"}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
