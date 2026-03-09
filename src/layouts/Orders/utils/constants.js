import MDBadge from "components/MDBadge";
import StatusCell from "layouts/ecommerce/orders/order-list/components/StatusCell";

export const ORDER_STATUS = {
  PENDING: "pending",
  UNDER_REVIEW: "under_review",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  RETURNED: "returned",
  INSTALLED: "installed",
  READY_FOR_DELIVERY: "ready_for_delivery",
  OUT_FOR_DELIVERY: "out_for_delivery",
};

const STATUS_CONFIG = {
  pending: { icon: "schedule", color: "warning", label: "قيد الانتظار" },
  under_review: { icon: "visibility", color: "info", label: "تحت المراجعة" },
  confirmed: { icon: "task_alt", color: "success", label: "تم التأكيد" },
  processing: { icon: "settings", color: "info", label: "جاري المعالجة" },
  shipped: { icon: "local_shipping", color: "info", label: "تم الشحن" },
  delivered: { icon: "done_all", color: "success", label: "تم التوصيل" },
  completed: { icon: "check_circle", color: "success", label: "مكتمل" },
  cancelled: { icon: "close", color: "error", label: "ملغي" },
  refunded: { icon: "undo", color: "warning", label: "مسترد" },
  returned: { icon: "undo", color: "dark", label: "مرتجع" },
  installed: { icon: "check", color: "info", label: "تم التركيب" },
  ready_for_delivery: {
    icon: "check",
    color: "secondary",
    label: "جاري التحضير للتوصيل",
  },
  out_for_delivery: {
    icon: "local_shipping",
    color: "success",
    label: "جاري التوصيل",
  },
};

export const getOrderStatus = (status) => {
  const key = String(status || "").toLowerCase();
  const cfg = STATUS_CONFIG[key] ?? {
    icon: "help_outline",
    color: "dark",
    label: "غير معروف",
  };

  return <StatusCell icon={cfg.icon} color={cfg.color} status={cfg.label} />;
};

export const getOrderBadgeStatus = (status) => {
  const key = String(status || "").toLowerCase();
  const cfg = STATUS_CONFIG[key] ?? {
    icon: "help_outline",
    color: "dark",
    label: "غير معروف",
  };

  return (
    <MDBadge
      variant="gradient"
      color={cfg.color}
      size="xs"
      badgeContent={cfg.label}
      container
    />
  );
};
