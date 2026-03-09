import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import SAR from "assets/images/SAR.svg";
import { colorsSelect } from "constants/constants";
import { Chip } from "@mui/material";

function ProductInfo({ product }) {
  const productColors = colorsSelect.filter((c) =>
    product?.colors.includes(c.value)
  );

  return (
    <MDBox>
      <MDBox mb={1}>
        <MDTypography variant="h3" fontWeight="bold">
          {product?.nameAr}
        </MDTypography>
      </MDBox>
      <MDBox mt={1}>
        <MDTypography variant="h6" fontWeight="medium">
          السعر
        </MDTypography>
      </MDBox>
      <MDBox mb={1}>
        <MDTypography
          variant="h5"
          fontWeight="medium"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {product?.price}{" "}
          <img
            src={SAR}
            alt={"ريال"}
            width={20}
            height={20}
            crossOrigin="anonymous"
            loading="lazy"
          />
        </MDTypography>
      </MDBox>
      {product?.tags?.length > 0 &&
        product?.tags.map((tag, index) => (
          <MDBadge
            key={index}
            variant="contained"
            color="success"
            badgeContent={tag}
            container
            sx={{ margin: "2px" }}
          />
        ))}
      <MDBox mt={3} mb={1} ml={0.5}>
        <MDTypography variant="button" fontWeight="bold" color="dark">
          الوصف
        </MDTypography>
      </MDBox>
      <MDTypography
        variant="body2"
        color="text"
        fontWeight="regular"
        verticalAlign="middle"
      >
        {product?.descriptionAr}
      </MDTypography>
      <MDBox mt={3} mb={1} ml={0.5}>
        <MDTypography variant="button" fontWeight="bold" color="dark">
          الالوان
        </MDTypography>
      </MDBox>
      <MDTypography
        variant="body2"
        color="text"
        fontWeight="regular"
        verticalAlign="middle"
      >
        {productColors.map((product) => (
          <Chip
            label={product?.label}
            size="small"
            variant="outlined"
            sx={{ direction: "rtl", mx: "2px" }}
          />
        ))}
      </MDTypography>
    </MDBox>
  );
}

export default ProductInfo;
