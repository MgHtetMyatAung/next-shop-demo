import {
  Archive,
  Bolt,
  BriefcaseBusiness,
  Calendar,
  CalendarCheck,
  CirclePlus,
  File,
  HandCoins,
  Home,
  Inbox,
  LaptopMinimal,
  Layers2,
  MessageSquareText,
  Notebook,
  NotebookPen,
  Search,
  Settings,
  Shapes,
  ShoppingBag,
  Ticket,
  Trash,
  UserCog,
  Users,
} from "lucide-react";
import { title } from "process";

// Menu items.

export const applicationMenuItems = [
  {
    title: "Overview",
    url: "#",
    icon: Home,
    items: [
      {
        title: "Forms",
        url: "#",
      },
      {
        title: "Inputs",
        url: "#",
      },
      {
        title: "Datas",
        url: "#",
        items: [
          {
            title: "All",
            url: "#",
          },
          {
            title: "Filters",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    title: "Customer",
    url: "#",
    icon: Users,
  },
  {
    title: "Order",
    url: "#",
    icon: NotebookPen,
  },
  {
    title: "Delivery",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Message",
    url: "#",
    icon: MessageSquareText,
  },
];

export const controlMenuItems = [
  //   {
  //     title: "Roles",
  //     url: "#",
  //     icon: UserCog,
  //   },
  {
    title: "Product",
    url: "/product",
    icon: ShoppingBag,
  },
  {
    title: "Category",
    url: "/category",
    icon: Layers2,
    // items: [
    //   {
    //     title: "List",
    //     url: "#",
    //   },
    //   {
    //     title: "Recent",
    //     url: "#",
    //   },
    //   {
    //     title: "Manage",
    //     url: "#",
    //     items: [
    //       {
    //         title: "Create",
    //         url: "#",
    //       },
    //       {
    //         title: "Filters",
    //         url: "#",
    //       },
    //     ],
    //   },
    // ],
  },
  {
    title: "Variant",
    url: "/variant",
    icon: Archive,
  },
  {
    title: "Property",
    url: "/property",
    icon: Bolt,
  },
  {
    title: "Brand",
    url: "/brand",
    icon: Shapes,
  },
  {
    title: "Promotion",
    url: "/promotion",
    icon: HandCoins,
  },
  //   {
  //     title: "Events",
  //     url: "#",
  //     icon: Ticket,
  //   },
  //   {
  //     title: "Holidays",
  //     url: "#",
  //     icon: CalendarCheck,
  //   },
  //   {
  //     title: "Assets",
  //     url: "#",
  //     icon: Layers2,
  //   },
];

export const supportMenuItems = [
  {
    title: "Trash",
    url: "#",
    icon: Trash,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
