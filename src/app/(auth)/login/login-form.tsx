"use client"
 
import authApiRequest from "@/apiRequests/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { handleErrorApi } from "@/lib/utils"
import { LoginBody, LoginBodyType } from "@/schema-validations/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldErrors, useForm } from "react-hook-form"
 
function LoginForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter();

   const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  async function onSubmit(values: LoginBodyType) {
    if(loading) return
    setLoading(true)
    try {
      const result = await authApiRequest.login(values)
      toast({
        title: "Đăng nhập",
        description: result.payload.message,
      })
      await authApiRequest.auth({ sessionToken: result.payload?.data?.token })
      router.push('/me')
    } catch (error: any) {
      handleErrorApi({
        error, setError: form.setError
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFormError = (err: FieldErrors<LoginBodyType>) => {
    console.log(err)
  }


  return (
    <Form {...form}>
      <form 
      noValidate
      className="space-y-2 max-w-[400px] w-full"
      onSubmit={form.handleSubmit(onSubmit, handleFormError) } >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="mật khẩu" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button className="mt-8 w-full md:w-[unset]" type="submit">Đăng nhập</Button>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm