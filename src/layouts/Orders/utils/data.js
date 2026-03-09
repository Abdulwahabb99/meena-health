export const orderData = {
  success: true,
  message: "Orders retrieved successfully",
  data: {
    orders: [
      {
        id: 1,
        orderNumber: "ORD-2024-001",
        status: "PENDING",
        totalAmount: 1299.99,
        createdAt: "2023-12-01T10:00:00.000Z",
        user: { fullName: "Ahmed Ali", avatar: null },
        orderItems: [
          {
            product: {
              id: 1,
              nameEn: "iPhone 14 Pro",
              nameAr: "آيفون 14 برو",
              price: 999.99,
            },
          },
          {
            product: {
              id: 2,
              nameEn: "iPhone 15 Pro",
              nameAr: "آيفون 15 برو",
              price: 1299.99,
            },
          },
          {
            product: {
              id: 3,
              nameEn: "iPhone 16 Pro",
              nameAr: "آيفون 16 برو",
              price: 1599.99,
            },
          },
        ],
      },
      {
        id: 2,
        orderNumber: "ORD-2024-002",
        status: "CONFIRMED",
        totalAmount: 899.5,
        createdAt: "2023-12-02T09:00:00.000Z",
        user: { fullName: "Sara Mohamed", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: "Samsung S23",
              nameAr: "سامسونج S23",
              price: 700,
            },
          },
        ],
      },
      {
        id: 3,
        orderNumber: "ORD-2024-003",
        status: "SHIPPED",
        totalAmount: 599.99,
        createdAt: "2023-12-03T11:00:00.000Z",
        user: { fullName: "Omar Hassan", avatar: null },
        orderItems: [
          {
            product: { nameEn: "Apple AirPods", nameAr: "إيربودز", price: 700 },
          },
        ],
      },
      {
        id: 4,
        orderNumber: "ORD-2024-004",
        status: "DELIVERED",
        totalAmount: 450,
        createdAt: "2023-12-04T14:00:00.000Z",
        user: { fullName: "Laila Kareem", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: 'Dell Monitor 27"',
              nameAr: "شاشة ديل 27 بوصة",
              price: 700,
            },
          },
        ],
      },
      {
        id: 5,
        orderNumber: "ORD-2024-005",
        status: "CANCELLED",
        totalAmount: 2300,
        createdAt: "2023-12-05T08:00:00.000Z",
        user: { fullName: "Mohamed Ali", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: "LG OLED TV",
              nameAr: "شاشة LG OLED",
              price: 700,
            },
          },
        ],
      },
      {
        id: 6,
        orderNumber: "ORD-2024-006",
        status: "RETURNED",
        totalAmount: 1500,
        createdAt: "2023-12-06T12:00:00.000Z",
        user: { fullName: "Yara Adel", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: "HP Laptop 15",
              nameAr: "لاب توب HP 15",
              price: 700,
            },
          },
        ],
      },
      {
        id: 7,
        orderNumber: "ORD-2024-007",
        status: "DELIVERED",
        totalAmount: 700,
        createdAt: "2023-12-07T13:00:00.000Z",
        user: { fullName: "Khaled Ibrahim", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: "Sony Headphones",
              nameAr: "سماعات سوني",
              price: 700,
            },
          },
        ],
      },
      {
        id: 8,
        orderNumber: "ORD-2024-008",
        status: "PENDING",
        totalAmount: 3200,
        createdAt: "2023-12-08T15:00:00.000Z",
        user: { fullName: "Fatma Nabil", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: "MacBook Air",
              nameAr: "ماك بوك إير",
              price: 3200,
            },
          },
        ],
      },
      {
        id: 9,
        orderNumber: "ORD-2024-009",
        status: "CONFIRMED",
        totalAmount: 1100,
        createdAt: "2023-12-09T16:00:00.000Z",
        user: { fullName: "Hassan Mostafa", avatar: null },
        orderItems: [
          { product: { nameEn: "iPad Pro", nameAr: "آيباد برو", price: 1100 } },
        ],
      },
      {
        id: 10,
        orderNumber: "ORD-2024-010",
        status: "SHIPPED",
        totalAmount: 2500,
        createdAt: "2023-12-10T17:00:00.000Z",
        user: { fullName: "Nour El-Din", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: "Asus Gaming Laptop",
              nameAr: "لاب توب أسوس جيمينج",
              price: 2500,
            },
          },
        ],
      },
      {
        id: 11,
        orderNumber: "ORD-2024-011",
        status: "DELIVERED",
        totalAmount: 4300,
        createdAt: "2023-12-11T18:00:00.000Z",
        user: { fullName: "Mona Tarek", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: "Canon EOS Camera",
              nameAr: "كاميرا كانون EOS",
              price: 4300,
            },
          },
        ],
      },
      {
        id: 12,
        orderNumber: "ORD-2024-012",
        status: "PENDING",
        totalAmount: 999.99,
        createdAt: "2023-12-12T19:00:00.000Z",
        user: { fullName: "Ali Hassan", avatar: null },
        orderItems: [
          {
            product: {
              nameEn: "Fitbit Watch",
              nameAr: "ساعة فيتبت",
              price: 700,
            },
          },
        ],
      },
    ],
    pagination: {
      total: 12,
      page: 1,
      limit: 25,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  },
};
