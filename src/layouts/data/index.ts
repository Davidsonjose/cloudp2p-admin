import { ADDUSER, SETTING, KYC, SWAP, SEND, USERS } from "@/assets";

export const supervisor = [
  {
    category: "ACCOUNT",
    sub: [
      { title: "Users", icon: USERS, path: "/dashboard/admin/users" },
      {
        title: "Send & Receive",
        icon: SEND,
        path: "/dashboard/admin/transaction/sendandreceive",
      },
      {
        title: "Swap Transactions",
        icon: SWAP,
        path: "/dashboard/admin/transaction/swap-transaction",
      },
      {
        title: "P2P Offers",
        icon: SWAP,
        path: "/dashboard/admin/transaction/p2p-offers",
      },
      {
        title: "P2P Trades",
        icon: SWAP,
        path: "/dashboard/admin/transaction/p2p-trades",
      },
      // { title: "KYC", icon: KYC, path: "/dashboard/admin/userkyc" },
    ],
  },
  {
    category: "MANAGEMENT",
    sub: [
      {
        title: "Manage Admin",
        icon: SETTING,
        path: "/dashboard/admin/manage-admin",
      },
    ],
  },
];
export const manager = [
  {
    category: "ACCOUNT",
    sub: [
      { title: "Users", icon: USERS, path: "/dashboard/admin/users" },
      {
        title: "Send & Receive",
        icon: SEND,
        path: "/dashboard/admin/transaction/sendandreceive",
      },
      {
        title: "Swap Transactions",
        icon: SWAP,
        path: "/dashboard/admin/transaction/swap-transaction",
      },
      {
        title: "P2P Offers",
        icon: SWAP,
        path: "/dashboard/admin/transaction/p2p-offers",
      },
      {
        title: "P2P Trades",
        icon: SWAP,
        path: "/dashboard/admin/transaction/p2p-trades",
      },
      // { title: "KYC", icon: KYC, path: "/dashboard/admin/userkyc" },
    ],
  },
  {
    category: "MANAGEMENT",
    sub: [
      {
        title: "Manage Admin",
        icon: SETTING,
        path: "/dashboard/admin/manage-admin",
      },
    ],
  },
];
export const support = [
  {
    category: "ACCOUNT",
    sub: [
      { title: "Users", icon: USERS, path: "/dashboard/admin/users" },
      {
        title: "Send & Receive",
        icon: SEND,
        path: "/dashboard/admin/transaction/sendandreceive",
      },
      {
        title: "Swap Transactions",
        icon: SWAP,
        path: "/dashboard/admin/transaction/swap-transaction",
      },
      {
        title: "P2P Offers",
        icon: SWAP,
        path: "/dashboard/admin/transaction/p2p-offers",
      },
      {
        title: "P2P Trades",
        icon: SWAP,
        path: "/dashboard/admin/transaction/p2p-trades",
      },
      // { title: "KYC", icon: KYC, path: "/dashboard/admin/userkyc" },
    ],
  },
];
