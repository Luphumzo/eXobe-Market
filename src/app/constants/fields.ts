interface Field {
  label: string;
  type: string;
  placeholder: string;
  hasReveal?: boolean;
}

const registerFormFields: Field[] = [
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
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm Password",
    hasReveal: true,
  },
];

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

export { registerFormFields, loginFormFields };
