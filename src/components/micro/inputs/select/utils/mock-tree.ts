import { TreeSelectItem } from "../types";

export const mock: TreeSelectItem[] = [
  {
    label: "کل منابع",
    value: 0,
    children: [
      {
        label: "راهداری",
        value: 1,
      },
      {
        label: "شهرداری",
        value: 4,
        children: [
          { label: "تهران", value: 5 },
          { label: "گرگان", value: 6 },
          { label: "شیراز", value: 7 },
          { label: "قم", value: 856 },
        ],
      },
      {
        label: "اختصاصی",
        value: 8,
        children: [
          {
            label: "سهاد",
            value: 9,
            children: [
              { label: "تهران ۱", value: 10 },
              { label: "مشهد ۱", value: 11 },
            ],
          },
        ],
      },
    ],
  },
];
