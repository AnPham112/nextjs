import envConfig from "@/config";
import { cookies } from "next/headers"
import ProfileClient from "./profile";

export default async function MeProfile() {
  const cookieStorage = cookies()
  const sessionToken = cookieStorage.get('sessionToken');

  const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionToken?.value}`
    },
  }).then(async (res) => {
    const payload = await res.json()
    const data = {
      status: res.status,
      payload
    }
    if(!res.ok) {
      throw data
    }
    return data;
  })

  return (
    <div>hello {result.payload.data?.name}
    
    <ProfileClient />
    
    </div>
  )
}
