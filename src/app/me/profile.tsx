'use client'

import envConfig from "@/config"
import { useEffect, useState } from "react"
import { useAppContext } from "../AppProvider"

interface Profile {
  id: number;
  email: string;
  name: string;
}

export default function ProfileClient() {
  const { sessionToken } = useAppContext();
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const fetchProfile = async() => {
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`
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
      setProfile(result.payload.data)
    }

    fetchProfile()
  }, [sessionToken])

  

  return (
    <>
      <h1>Profile client page</h1>
      <p>hello {profile?.email}</p>
    </>
  )
}
