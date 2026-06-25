type Field = {
  name: string
  label: string
  type: string
  placeholder: string
  autoComplete?: string
  hasReveal?: boolean
  minLength?: number
  requiredMessage?: string
  minLengthMessage?: string
}

const loginFormFields: Field[] = [
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "Email address",
    autoComplete: "email",
    requiredMessage: "Enter a valid email address.",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    autoComplete: "current-password",
    hasReveal: true,
    minLength: 8,
    requiredMessage: "Password must be at least 8 characters.",
    minLengthMessage: "Password must be at least 8 characters.",
  },
]

const accountFields: Field[] = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    placeholder: "Full name",
    autoComplete: "name",
    minLength: 2,
    requiredMessage: "Enter your full name.",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "Email address",
    autoComplete: "email",
    requiredMessage: "Enter a valid email address.",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Password",
    autoComplete: "new-password",
    hasReveal: true,
    minLength: 8,
    requiredMessage: "Password must be at least 8 characters.",
    minLengthMessage: "Password must be at least 8 characters.",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    placeholder: "Confirm password",
    autoComplete: "new-password",
    hasReveal: true,
    minLength: 8,
    requiredMessage: "Confirm your password.",
    minLengthMessage: "Confirm password must be at least 8 characters.",
  },
]

const sellerFields: Field[] = [
  {
    name: "businessName",
    label: "Business name",
    type: "text",
    placeholder: "Business name",
    autoComplete: "organization",
    minLength: 2,
    requiredMessage: "Enter your business name.",
  },
  {
    name: "businessDescription",
    label: "Business description",
    type: "text",
    placeholder: "Short business description",
    minLength: 10,
    requiredMessage: "Describe your business in at least 10 characters.",
    minLengthMessage: "Describe your business in at least 10 characters.",
  },
  {
    name: "location",
    label: "Province or city",
    type: "text",
    placeholder: "Province or city",
    autoComplete: "address-level1",
    minLength: 2,
    requiredMessage: "Enter your province or city.",
  },
  {
    name: "industry",
    label: "Industry",
    type: "text",
    placeholder: "Industry or category",
    minLength: 2,
    requiredMessage: "Enter your industry or category.",
  },
  {
    name: "phoneNumber",
    label: "Phone number",
    type: "tel",
    placeholder: "Phone number",
    autoComplete: "tel",
    minLength: 10,
    requiredMessage: "Enter a valid phone number.",
    minLengthMessage: "Enter a valid phone number.",
  },
]

export type { Field }
export { loginFormFields, sellerFields, accountFields }
