import { cookies } from "next/headers"
import ProfileClient from "./profile";
import accountApiRequest from "@/apiRequests/account";

export default async function MeProfile() {
  const cookieStorage = cookies()
  const sessionToken = cookieStorage.get('sessionToken');

  const result = await accountApiRequest.me(sessionToken?.value ?? '')

  return (
    <div>hello {result.payload.data?.name}
    
    <ProfileClient />
    
    </div>
  )
}
