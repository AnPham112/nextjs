'use client'

import authApiRequest from "@/apiRequests/auth";
import { handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function ButtonLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <Button size={"sm"} onClick={handleLogout}>
      Đăng xuất
    </Button>
  );
}
