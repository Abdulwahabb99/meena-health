import { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";

import "swiper/css";

function HomeCarousel({ slides }) {
  const swiperRef = useRef(null);

  const handlePrev = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  return (
    <MDBox position="relative">
      <Swiper
        ref={swiperRef}
        spaceBetween={16}
        slidesPerView={1}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <MDBox
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                height: 280,
                bgcolor: "#F3EEFF",
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </MDBox>
          </SwiperSlide>
        ))}
      </Swiper>
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 40,
          height: 40,
          bgcolor: "#8C56FF",
          color: "white",
          "&:hover": { bgcolor: "#6B47F5", color: "white" },
        }}
      >
        <Icon>chevron_left</Icon>
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 40,
          height: 40,
          bgcolor: "#8C56FF",
          color: "white",
          "&:hover": { bgcolor: "#6B47F5", color: "white" },
        }}
      >
        <Icon>chevron_right</Icon>
      </IconButton>
    </MDBox>
  );
}

HomeCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
    })
  ).isRequired,
};

export default HomeCarousel;
