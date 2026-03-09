import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TimelineItem from "examples/Timeline/TimelineItem";

function TrackOrder({ orderEvents }) {
  return (
    <>
      <MDTypography variant="h6" fontWeight="medium">
        تتبع الطلب
      </MDTypography>
      <MDBox mt={2}>
        {orderEvents.map((event) => (
          <TimelineItem
            key={event.id}
            color={event.color}
            icon={event.icon}
            title={event.title}
            dateTime={event.dateTime}
          />
        ))}
        <TimelineItem
          color="secondary"
          icon="notifications"
          title="تم استلام الطلب"
          dateTime="22 ديسمبر 7:20 م"
        />
        <TimelineItem
          color="secondary"
          icon="inventory_2"
          title="تم إنشاء رقم الطلب #1832412"
          dateTime="22 ديسمبر 7:21 ص"
        />
        {/* <TimelineItem
          color="secondary"
          icon="shopping_cart"
          title="تم إرسال الطلب إلى شركة الشحن"
          dateTime="22 ديسمبر 8:10 ص"
        /> */}
        <TimelineItem
          color="success"
          icon="done"
          title="تم توصيل الطلب"
          dateTime="22 ديسمبر 4:54 م"
          lastItem
        />
      </MDBox>
    </>
  );
}

export default TrackOrder;
