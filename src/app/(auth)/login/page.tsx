import { SplitAuthPage } from "@/components/auth/split-auth-page"
import { loginFormFields as fields } from "@/app/constants/fields"

const LoginPage = () => {
  return (
    <SplitAuthPage
      title="Welcome Back!"
      buttonLabel="Login"
      fields={fields}
      footerText="Don't have an account?"
      footerHref="/register"
      footerLinkLabel="Register"
      forgotPassword
    />
  )
}

export default LoginPage
