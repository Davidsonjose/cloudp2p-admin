import {
  COMMUNITY,
  COPY,
  ELLIPSE,
  FEEDBACK,
  HOME,
  ICE,
  SETTINGS,
  USER,
  VISITOR,
  VISITOR_MGT,
} from "@/assets";

export const admin = [
  {
    title: "Dashboard",
    icon: HOME,
    path: "/dashboard/admin",
    subMenu: null,
    variant: "regular",
  },
  {
    title: "Community",
    icon: COMMUNITY,
    path: null,
    subMenu: [
      {
        title: "Enterprise",
        icon: ELLIPSE,
        path: "/dashboard/admin/company",
      },
      {
        title: "Registered managers",
        icon: ELLIPSE,
        path: "/dashboard/admin/registered-managers",
      },
      {
        title: "Registered users",
        icon: ELLIPSE,
        path: "/dashboard/admin/registered-users",
      },
    ],
    variant: "",
  },
  {
    title: "Visitor management",
    icon: VISITOR_MGT,
    path: "/dashboard/admin/visitor-management",
    subMenu: null,
    variant: "regular",
  },
  {
    title: "ICE",
    icon: ICE,
    path: null,
    subMenu: [
      {
        title: "Information",
        icon: ELLIPSE,
        path: "/dashboard/admin/information",
        color: "text-[#001F56]",
      },
      {
        title: "Communication",
        icon: ELLIPSE,
        path: "/dashboard/admin/communication",
        color: "text-green-700",
      },
      {
        title: "Emergency",
        icon: ELLIPSE,
        path: "/dashboard/admin/emergency",
        color: "text-[#F51F00]",
      },
    ],
    variant: "",
  },
  {
    title: "Feedback",
    icon: FEEDBACK,
    path: "/dashboard/admin/feadback-complaints",
    subMenu: null,
    variant: "regular",
  },
  {
    title: "Account settings",
    icon: SETTINGS,
    path: "/dashboard/admin/account-settings",
    subMenu: null,
    variant: "regular",
  },
];
export const manager = [
  {
    title: "Dashboard",
    icon: HOME,
    path: "/dashboard/manager",
    subMenu: null,
    variant: "regular",
  },
  {
    title: "Community",
    icon: COMMUNITY,
    path: null,
    subMenu: [
      {
        title: "Registered users",
        icon: ELLIPSE,
        path: "/dashboard/manager/staff",
      },
      // {
      // 	title: 'Registered Managers',
      // 	icon: ELLIPSE,
      // 	path: '/dashboard/admin/registered-managers',
      // },
    ],
    variant: "",
  },
  {
    title: "Visitor management",
    icon: VISITOR_MGT,
    path: "/dashboard/manager/visitor-management",
    subMenu: null,
    variant: "regular",
  },
  {
    title: "ICE",
    icon: ICE,
    path: null,
    subMenu: [
      {
        title: "Information",
        icon: ELLIPSE,
        path: "/dashboard/manager/information",
        color: "text-[#001F56]",
      },
      {
        title: "Communication",
        icon: ELLIPSE,
        path: "/dashboard/manager/communication",
        color: "text-[#00FF19]",
      },
      {
        title: "Emergency",
        icon: ELLIPSE,
        path: "/dashboard/manager/emergency",
        color: "text-[#F51F00]",
      },
    ],
    variant: "",
  },
  {
    title: "Account settings",
    icon: SETTINGS,
    path: "/dashboard/manager/account-settings",
    subMenu: null,
    variant: "regular",
  },
];
