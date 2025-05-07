'use server'

import { redirect } from "next/navigation"

export const onOAuthInstagram = async (strategy: string) => {
  if(strategy === "instagram") {
    return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
  }
}
