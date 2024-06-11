"use client";

import { useEffect, useState } from "react";
import accountApiRequest from "@/apiRequests/account";
import { handleErrorApi } from "@/lib/utils";

interface Profile {
  id: number;
  email: string;
  name: string;
}

export default function ProfileClient() {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await accountApiRequest.meClient();
        setProfile(result.payload.data);
      } catch (error) {
        handleErrorApi({
          error,
        });
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <h1>Profile client page</h1>
      <p>hello {profile?.email}</p>
    </>
  );
}
