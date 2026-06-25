"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { loginFormFields as fields } from "@/app/constants/fields"
import { SplitAuthPage } from "@/components/auth/split-auth-page"
import { loginWithEmailAndPassword } from "@/features/auth/auth"

type LoginFormValues = {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const loginMutation = useMutation({
    mutationFn: loginWithEmailAndPassword,
    onSuccess: () => {
      router.push("/")
    },
  })

  const submitLogin = (values: Record<string, string>) => {
    loginMutation.mutate(values as LoginFormValues)
  }

  return (
    <SplitAuthPage
      title="Welcome Back!"
      buttonLabel="Login"
      fields={fields}
      footerText="Don't have an account?"
      footerHref="/register"
      footerLinkLabel="Register"
      forgotPassword
      isSubmitting={loginMutation.isPending}
      pendingButtonLabel="Logging in..."
      submitError={
        loginMutation.isError ? loginMutation.error.message : undefined
      }
      onSubmit={submitLogin}
    />
  )
}

export default LoginPage
