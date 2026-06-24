import { SplitAuthPage } from "@/components/auth/split-auth-page"
import {registerFormFields as fields} from "@/app/constants/fields"

const RegisterPage = () => {
  return (
    <SplitAuthPage
      title="Create Account"
      buttonLabel="Register"
      fields={fields}
      footerText="Already have an account?"
      footerHref="/login"
      footerLinkLabel="Login"
    />
  )
}

export default RegisterPage
