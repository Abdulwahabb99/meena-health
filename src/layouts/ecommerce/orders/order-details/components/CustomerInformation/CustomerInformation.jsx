import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";

function CustomerInformation({ customer }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    <>
      <MDTypography variant="h6" fontWeight="medium">
        معلومات العميل{" "}
      </MDTypography>
      <MDBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor={"transparent"}
        borderRadius="lg"
        p={3}
        mt={2}
      >
        <MDBox
          width="100%"
          display="flex"
          flexDirection="column"
          lineHeight={1}
        >
          <MDBox mb={2}>
            <MDTypography
              variant="button"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {customer?.fullName}
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" fontWeight="regular" color="text">
              البريد الإلكتروني:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {customer?.email ||
                  customer?.fullName.split(" ").join("").toLowerCase()}
                @gmail.com
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" fontWeight="regular" color="text">
              الرقم:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {customer?.phoneNumber || ""}
              </MDTypography>
            </MDTypography>
          </MDBox>
          {customer?.address && (
            <MDBox mb={1} lineHeight={0}>
              <MDTypography variant="caption" fontWeight="regular" color="text">
                العنوان:&nbsp;&nbsp;&nbsp;
                <MDTypography variant="caption" fontWeight="medium">
                  {customer?.address || ""}
                </MDTypography>
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    </>
  );
}

export default CustomerInformation;
