import { useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

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
              <MDBox
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p={2}
                sx={{
                  background:
                    "linear-gradient(transparent, rgba(0,0,0,0.6))",
                }}
              >
                <MDTypography variant="h6" color="white" fontWeight="bold">
                  {slide.title}
                </MDTypography>
                {slide.subtitle && (
                  <MDTypography variant="caption" color="white">
                    {slide.subtitle}
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </SwiperSlide>
        ))}
      </Swiper>
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 36,
          height: 36,
          bgcolor: "white",
          boxShadow: 2,
          "&:hover": { bgcolor: "grey.100" },
        }}
      >
        <Icon sx={{ color: "#831ED2" }}>chevron_left</Icon>
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 36,
          height: 36,
          bgcolor: "white",
          boxShadow: 2,
          "&:hover": { bgcolor: "grey.100" },
        }}
      >
        <Icon sx={{ color: "#831ED2" }}>chevron_right</Icon>
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
