import React, { useMemo, useState } from "react";
// import ImgsViewer from "react-images-viewer";
import Stack from "@mui/material/Stack";
import MDBox from "components/MDBox";

function ProductImages({ productImages }) {
  const [currentImage, setCurrentImage] = useState(productImages[0]?.url);
  const [imgsViewer, setImgsViewer] = useState(false);
  const [imgsViewerCurrent, setImgsViewerCurrent] = useState(0);

  const handleSetCurrentImage = ({ currentTarget }) => {
    setCurrentImage(currentTarget.src);
    setImgsViewerCurrent(Number(currentTarget.id));
  };

  const openImgsViewer = () => setImgsViewer(true);
  const closeImgsViewer = () => setImgsViewer(false);
  const imgsViewerNext = () => setImgsViewerCurrent(imgsViewerCurrent + 1);
  const imgsViewerPrev = () => setImgsViewerCurrent(imgsViewerCurrent - 1);

  const images = useMemo(() => {
    return productImages.map((image) => ({
      src: image?.url,
      id: image?.id,
      loading: "lazy",
    }));
  }, [productImages]);

  return (
    <MDBox>
      {/* <ImgsViewer
        imgs={images}
        isOpen={imgsViewer}
        onClose={closeImgsViewer}
        currImg={imgsViewerCurrent}
        onClickPrev={imgsViewerPrev}
        onClickNext={imgsViewerNext}
        backdropCloseable
      /> */}

      <MDBox
        component="img"
        src={currentImage}
        alt="Product Image"
        shadow="lg"
        borderRadius="lg"
        width="100%"
        onClick={openImgsViewer}
        crossOrigin="anonymous"
        loading="lazy"
      />
      <MDBox mt={2} pt={1}>
        <Stack direction="row" spacing={3}>
          {images.map((image) => (
            <MDBox
              component="img"
              id={0}
              src={image.src}
              alt="small image 1"
              borderRadius="lg"
              shadow="md"
              width="100%"
              height="5rem"
              minHeight="5rem"
              sx={{ cursor: "pointer", objectFit: "contain" }}
              onClick={handleSetCurrentImage}
              crossOrigin="anonymous"
              loading="lazy"
            />
          ))}
        </Stack>
      </MDBox>
    </MDBox>
  );
}

export default ProductImages;
