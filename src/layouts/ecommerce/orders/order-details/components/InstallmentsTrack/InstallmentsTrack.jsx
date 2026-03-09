import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import TimelineItem from "examples/Timeline/TimelineItem";
import { Card, Divider } from "@mui/material";
import { Icon } from "@mui/material";

function InstallmentsTrack({ installmentPlan }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    return new Intl.DateTimeFormat("ar-eg", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  // Helper function to get installment status
  const getInstallmentStatus = (installment) => {
    const now = new Date();
    const dueDate = new Date(installment.dueDate);

    if (installment.status === "PAID") {
      return { status: "paid", color: "success", text: "مدفوعة" };
    } else if (installment.status === "OVERDUE") {
      return { status: "overdue", color: "error", text: "متأخرة" };
    } else if (dueDate < now && installment.status === "PENDING") {
      return { status: "overdue", color: "error", text: "متأخرة" };
    } else if (installment.status === "PENDING") {
      return { status: "pending", color: "warning", text: "معلقة" };
    } else {
      return { status: "upcoming", color: "info", text: "قادمة" };
    }
  };

  // Helper function to get installment icon
  const getInstallmentIcon = (status) => {
    switch (status) {
      case "paid":
        return "check_circle";
      case "overdue":
        return "error";
      case "pending":
        return "schedule";
      default:
        return "schedule";
    }
  };

  if (!installmentPlan) {
    return (
      <Card sx={{ p: 3, textAlign: "center" }}>
        <MDTypography variant="h6" fontWeight="medium" color="text">
          تم الدفع
        </MDTypography>
      </Card>
    );
  }
  if (
    !installmentPlan?.installments ||
    installmentPlan.installments.length === 0
  ) {
    return (
      <Card sx={{ p: 3, textAlign: "center" }}>
        <MDTypography variant="h6" fontWeight="medium" color="text">
          لا توجد أقساط متاحة
        </MDTypography>
      </Card>
    );
  }

  return (
    <>
      {" "}
      <MDBox mb={3}>
        <MDTypography variant="h6" fontWeight="medium" color="dark">
          خطة الأقساط
        </MDTypography>
        <MDBox display="flex" gap={3} flexWrap="wrap">
          <MDTypography variant="body2" color="text">
            إجمالي المبلغ:{" "}
            <span style={{ fontWeight: "bold", color: "#000" }}>
              {formatCurrency(parseFloat(installmentPlan.totalAmount) || 0)}
            </span>
          </MDTypography>
          <MDTypography variant="body2" color="text">
            المبلغ الشهري:{" "}
            <span style={{ fontWeight: "bold", color: "#000" }}>
              {formatCurrency(parseFloat(installmentPlan.monthlyAmount) || 0)}
            </span>
          </MDTypography>
          <MDTypography variant="body2" color="text">
            عدد الأشهر:{" "}
            <span style={{ fontWeight: "bold", color: "#000" }}>
              {installmentPlan.totalMonths || 0}
            </span>
          </MDTypography>
        </MDBox>
      </MDBox>
      <Divider sx={{ mb: 3 }} />
      <MDBox>
        {installmentPlan.installments.map((installment, index) => {
          const isLast = index === installmentPlan.installments.length - 1;
          const installmentStatus = getInstallmentStatus(installment);

          return (
            <TimelineItem
              key={installment.id}
              color={installmentStatus.color}
              icon={getInstallmentIcon(installmentStatus.status)}
              title={`القسط ${installment.installmentNumber}`}
              dateTime={formatDate(installment.dueDate)}
              lastItem={isLast}
              description={
                <MDBox>
                  <MDBox display="flex" alignItems="center" gap={2} mb={1}>
                    <MDTypography variant="body2" fontWeight="medium">
                      المبلغ: {formatCurrency(parseFloat(installment.amount))}
                    </MDTypography>
                    <MDBadge
                      color={installmentStatus.color}
                      variant="contained"
                      size="sm"
                    >
                      {installmentStatus.text}
                    </MDBadge>
                  </MDBox>

                  {installment.paidAt && (
                    <MDBox display="flex" alignItems="center" gap={1}>
                      <Icon fontSize="small" color="success">
                        check_circle
                      </Icon>
                      <MDTypography variant="caption" color="success">
                        تم الدفع في: {formatDate(installment.paidAt)}
                      </MDTypography>
                    </MDBox>
                  )}

                  {/* {installment.payments && installment.payments.length > 0 && (
                    <MDBox mt={1}>
                      <MDTypography
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                      >
                        المدفوعات:
                      </MDTypography>
                      {installment.payments.map((payment, paymentIndex) => (
                        <MDBox
                          key={paymentIndex}
                          display="flex"
                          alignItems="center"
                          gap={1}
                          mt={0.5}
                        >
                          <Icon fontSize="small" color="success">
                            payment
                          </Icon>
                          <MDTypography variant="caption" color="success">
                            {formatCurrency(parseFloat(payment.amount))} -{" "}
                            {formatDate(payment.paidAt)}
                          </MDTypography>
                        </MDBox>
                      ))}
                    </MDBox>
                  )} */}
                </MDBox>
              }
            />
          );
        })}
      </MDBox>
      {/* Summary */}
      <MDBox mt={3} p={2} bgColor="grey-100" borderRadius="md">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <MDTypography variant="body2" fontWeight="medium">
            إجمالي المدفوع:
          </MDTypography>
          <MDTypography variant="body2" fontWeight="bold" color="success">
            {formatCurrency(
              installmentPlan.installments
                .filter((inst) => inst.status === "PAID")
                .reduce((sum, inst) => sum + parseFloat(inst.amount || 0), 0)
            )}
          </MDTypography>
        </MDBox>

        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDTypography variant="body2" fontWeight="medium">
            المتبقي:
          </MDTypography>
          <MDTypography variant="body2" fontWeight="bold" color="warning">
            {formatCurrency(
              installmentPlan.installments
                .filter((inst) => inst.status !== "PAID")
                .reduce((sum, inst) => sum + parseFloat(inst.amount || 0), 0)
            )}
          </MDTypography>
        </MDBox>
      </MDBox>
    </>
  );
}

export default InstallmentsTrack;
