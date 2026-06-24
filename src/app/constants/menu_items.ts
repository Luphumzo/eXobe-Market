export type MenuItem = {
  label: string;
  href: string;
  subitems?: {
    label: string;
    href: string;
    description?: string;
  }[];
};

export const menuItems: MenuItem[] = [
  {
    label: "Collections",
    href: "/marketplace/collections",
    subitems: [
      {
        label: "Bags",
        href: "/collections/Bags",
      },
      {
        label: "",
        href: "/collections/hair-care",
      },
    ],
  },
  {
    label: "Sale",
    href: "/collections/sale",
  },
];
