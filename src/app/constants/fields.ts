interface Field {
  label: string;
  type: string;
  placeholder: string;
  hasReveal?: boolean;
}

const loginFormFields: Field[] = [
  {
    label: "Email address",
    type: "email",
    placeholder: "Email address",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Password",
    hasReveal: true,
  },
];

const accountFields: Field[] = [
  {
    label: "Full name",
    type: "text",
    placeholder: "Full name",
  },
  {
    label: "Email address",
    type: "email",
    placeholder: "Email address",
  },
  {
    label: "Password",
    type: "password",
    placeholder: "Password",
    hasReveal: true,
  },
  {
    label: "Confirm password",
    type: "password",
    placeholder: "Confirm password",
    hasReveal: true,
  },
];

const sellerFields: Field[] = [
  {
    label: "Business name",
    type: "text",
    placeholder: "Business name",
  },
  {
    label: "Business description",
    type: "text",
    placeholder: "Short business description",
  },
  {
    label: "Province or city",
    type: "text",
    placeholder: "Province or city",
  },
  {
    label: "Industry",
    type: "text",
    placeholder: "Industry or category",
  },
  {
    label: "Phone number",
    type: "tel",
    placeholder: "Phone number",
  },
];

export { loginFormFields, sellerFields, accountFields };
