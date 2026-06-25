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
    href: "/collections",
    subitems: [
      {
        label: "Bags",
        href: "/collections/bags",
      },
      {
        label: "Homeware",
        href: "/collections/homeware",
      },
      {
        label: "Beauty",
        href: "/collections/beauty",
      },
      {
        label: "Clothing",
        href: "/collections/clothing",
      },
    ],
  },
  {
    label: "Sale",
    href: "/collections/sale",
  },
];
