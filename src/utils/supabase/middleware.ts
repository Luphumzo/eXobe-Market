import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

const sellerRoutePrefix = "/seller"

type AuthClaims = {
  user_metadata?: {
    accountType?: string
  }
}

const isSellerRoute = (pathname: string) => {
  return pathname === sellerRoutePrefix || pathname.startsWith(`${sellerRoutePrefix}/`)
}

const redirectToLogin = (request: NextRequest) => {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = "/login"
  redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname)

  return NextResponse.redirect(redirectUrl)
}

const redirectToHome = (request: NextRequest) => {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = "/"
  redirectUrl.search = ""

  return NextResponse.redirect(redirectUrl)
}

const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  const { data, error } = await supabase.auth.getClaims()
  const claims = data?.claims

  if (!isSellerRoute(request.nextUrl.pathname)) {
    return supabaseResponse
  }

  if (error || !claims) {
    return redirectToLogin(request)
  }

  const accountType = (claims as AuthClaims).user_metadata?.accountType

  if (accountType !== "seller") {
    return redirectToHome(request)
  }

  return supabaseResponse
}

export { updateSession }
