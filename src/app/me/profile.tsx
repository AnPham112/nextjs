'use client'

import { useEffect, useState } from "react"
import accountApiRequest from "@/apiRequests/account";

interface Profile {
  id: number;
  email: string;
  name: string;
}

export default function ProfileClient() {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const fetchProfile = async() => {
      const result = await accountApiRequest.meClient()
      setProfile(result.payload.data)
    }
    fetchProfile()
  }, [])

  

  return (
    <>
      <h1>Profile client page</h1>
      <p>hello {profile?.email}</p>
    </>
  )
}
