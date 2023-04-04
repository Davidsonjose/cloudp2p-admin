import {
  ADDUSER, SETTING, KYC, SWAP, SEND, USERS
} from "@/assets";


export const mainadmin = [
  {
    category: "ACCOUNT",
    sub: [
      { title: "Users", icon: USERS, path: "/dashboard/admin" },
      { title: "Send & Receive", icon: SEND, path: "/dashboard/admin" },
      { title: "Swap Transactions", icon: SWAP, path: "/dashboard/admin" },
      { title: "KYC", icon: KYC, path: "/dashboard/admin" },
    ]
  },
  {
    category: "MANAGEMENT",
    sub: [
      { title: "Add User", icon: ADDUSER, path: "/dashboard/admin" },
      { title: "Manage Admin", icon: SETTING, path: "/dashboard/admin" }
    ]
  },
];
