import {
  ADDUSER, SETTING, KYC, SWAP, SEND, USERS
} from "@/assets";


export const mainadmin = [
  {
    category: "ACCOUNT",
    sub: [
      { title: "Users", icon: USERS, path: "/dashboard/admin/users" },
      { title: "Send & Receive", icon: SEND, path: "/dashboard/admin/transaction/sendandreceive" },
      { title: "Swap Transactions", icon: SWAP, path: "/dashboard/admin/transaction/swap-transaction" },
      { title: "KYC", icon: KYC, path: "/dashboard/admin/userkyc" },
      { title: "P2P", icon: KYC, path: "/dashboard/admin/userkyc" },
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
