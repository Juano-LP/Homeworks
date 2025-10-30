export const menuTree = [
  {
    title: "Profile",
    link: "/profile",
    component: "ProfileComponent",
  },
  {
    title: "Messages",
    link: "/messages",
    component: "MessagesComponent",
  },
  {
    title: "Settings",
    link: "/settings",
    children: [
      {
        title: "Account",
        link: "/settings/account",
        children: [
          {
            title: "Profile",
            link: "/settings/account/profile",
          },
          {
            title: "Security & Privacy",
            link: "/settings/account/security",
          },
          {
            title: "Password",
            link: "/settings/account/password",
          },
        ],
      },
      {
        title: "Notification",
        link: "/settings/notification",
      },
    ],
  },
  {
    title: "Help",
    link: "/help",
    children: [
      { title: "FAQ", link: "/help/faq" },
      { title: "Submit a Ticket", link: "/help/ticket" },
      { title: "Network Status", link: "/help/status" },
    ],
  },
  { title: "Logout", link: "/logout" },
];
