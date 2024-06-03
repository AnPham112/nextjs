"use client"
 
import { useAppContext } from "@/app/AppProvider"
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
import envConfig from "@/config"
import { LoginBody, LoginBodyType } from "@/schema-validations/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldErrors, useForm } from "react-hook-form"
 
function LoginForm() {
  const { toast } = useToast()
  const {setSessionToken} = useAppContext()

   const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body:  JSON.stringify(values)
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
      toast({
        title: "Đăng nhập",
        description: result.payload.message,
      })
      const resultFromNextServer = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Content-Type': 'application/json'
        }
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
      setSessionToken(resultFromNextServer.payload.data.token)
    } catch (error: any) {
      const errors = error.payload.errors as {
        field: 'email' | 'password',
        message: string
      }[]
      const status = error.status as number
      if(status === 422) {
        errors.forEach((error) => {
          form.setError(error.field, {
            type: 'server',
            message: error.message
          })
        })
      } else {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: error.payload.message,
        })
      }
      
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