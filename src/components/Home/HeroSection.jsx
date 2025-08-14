import React from "react";
import HeroSectionCard from "./HeroSectionCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const HeroSection = () => {
  const homeData = [
  {
    heading: "Discover the vibrant life of Bangalore",
    subheading: "The Silicon Valley of India",
    src: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1920&q=80",
  },
  {
    heading: "Experience the charm of Mumbai",
    subheading: "The City of Dreams",
    src: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    heading: "Explore the heritage of Delhi",
    subheading: "The Capital of India",
    src: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    heading: "Uncover the spirit of Kolkata",
    subheading: "The Cultural Capital",
    src: "https://images.unsplash.com/photo-1575392499308-85a3af3a8c9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    heading: "Feel the vibe of Chennai",
    subheading: "Gateway to South India",
    src: "https://media.istockphoto.com/id/1226340114/photo/puratchi-thalaivar-dr-mgr-central-railway-station-chennai-central-railway-station-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=TF2BSVQw25WtC5YsF1WPukWmXCaEgLDWNlCvaTQxsNQ=",
  },
];
  return (
    <section className="max-w-[1800px] mx-auto w-full h-[90vh] mt-6 rounded-[25px] overflow-hidden relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {homeData.map((data, index) => (
          <SwiperSlide key={index} className="h-[90vh]">
            <HeroSectionCard
              heading={data.heading}
              subheading={data.subheading}
              src={data.src}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
